import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { supabase } from '../lib/supabase';
import type { AppNotification, Snop } from '../types';

type CitadelContextValue = {
  snops: Snop[];
  notifications: AppNotification[];

  savedIds: Set<string>;
  readIds: string[];

  loading: boolean;
  refreshing: boolean;
  error: string | null;

  savedCount: number;
  readCount: number;

  refresh: () => Promise<void>;

  toggleSaved: (id: string) => Promise<void>;
  isSaved: (id: string) => boolean;

  markRead: (id: string) => Promise<void>;

  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  clearNotifications: () => Promise<void>;
};

const CitadelContext = createContext<CitadelContextValue | null>(null);

function mapSnop(row: any): Snop {
  return {
    id: row.id,
    title: row.title,
    category: row.categories?.name ?? row.category ?? 'Science',
    source: row.sources?.name ?? row.source ?? 'Unknown',
    summary: row.summary ?? '',
    content: row.content ?? '',
    whyItMatters: row.why_it_matters ?? null,
    readingTime: row.reading_time_minutes ?? 1,
    publishedAt: row.published_at,
    sourceUrl: row.source_url ?? null,
    accentColor: row.accent_color ?? '#C9A46A',
    featured: Boolean(row.featured),
    size: row.tile_size ?? 'md',
    treatment: row.tile_treatment ?? 'solid',
  };
}

function mapNotification(row: any): AppNotification {
  return {
    id: row.id,
    kind: row.kind ?? 'new',
    title: row.title,
    description: row.description ?? '',
    createdAt: row.created_at,
    unread: row.read_at === null,
    snopId: row.snop_id ?? null,
  };
}

export function CitadelProvider({ children }: { children: ReactNode }) {
  const [snops, setSnops] = useState<Snop[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [readIds, setReadIds] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const [
        snopsResult,
        notificationsResult,
      ] = await Promise.all([
        supabase
          .from('snops')
          .select(`
            id,
            title,
            summary,
            content,
            why_it_matters,
            reading_time_minutes,
            published_at,
            source_url,
            accent_color,
            featured,
            tile_size,
            tile_treatment,
            category_id,
            source_id,
            categories (
              name
            ),
            sources (
              name
            )
          `)
          .eq('status', 'published')
          .order('published_at', { ascending: false }),

        supabase
          .from('notifications')
          .select(`
            id,
            kind,
            title,
            description,
            created_at,
            read_at,
            snop_id
          `)
          .order('created_at', { ascending: false }),
      ]);

      if (snopsResult.error) {
        throw snopsResult.error;
      }

      if (notificationsResult.error) {
        throw notificationsResult.error;
      }

      setSnops((snopsResult.data ?? []).map(mapSnop));
      setNotifications((notificationsResult.data ?? []).map(mapNotification));

      const userResult = await supabase.auth.getUser();

      if (userResult.data.user) {
        const [savedResult, historyResult] = await Promise.all([
          supabase
            .from('saved_snops')
            .select('snop_id')
            .eq('user_id', userResult.data.user.id),

          supabase
            .from('reading_history')
            .select('snop_id, read_at')
            .eq('user_id', userResult.data.user.id)
            .order('read_at', { ascending: false }),
        ]);

        if (savedResult.error) {
          throw savedResult.error;
        }

        if (historyResult.error) {
          throw historyResult.error;
        }

        setSavedIds(
          new Set((savedResult.data ?? []).map((row) => row.snop_id)),
        );

        setReadIds(
          (historyResult.data ?? []).map((row) => row.snop_id),
        );
      } else {
        setSavedIds(new Set());
        setReadIds([]);
      }
    } catch (err) {
      console.error('Failed to load Citadel data:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load the citadel.',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const toggleSaved = useCallback(async (id: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('You need an account to save Snops.');
    }

    const currentlySaved = savedIds.has(id);

    if (currentlySaved) {
      const { error } = await supabase
        .from('saved_snops')
        .delete()
        .eq('user_id', user.id)
        .eq('snop_id', id);

      if (error) {
        throw error;
      }

      setSavedIds((previous) => {
        const next = new Set(previous);
        next.delete(id);
        return next;
      });

      return;
    }

    const { error } = await supabase
      .from('saved_snops')
      .insert({
        user_id: user.id,
        snop_id: id,
      });

    if (error) {
      throw error;
    }

    setSavedIds((previous) => {
      const next = new Set(previous);
      next.add(id);
      return next;
    });
  }, [savedIds]);

  const isSaved = useCallback(
    (id: string) => savedIds.has(id),
    [savedIds],
  );

  const markRead = useCallback(async (id: string) => {
    if (readIds.includes(id)) {
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from('reading_history')
      .upsert(
        {
          user_id: user.id,
          snop_id: id,
          read_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id,snop_id',
        },
      );

    if (error) {
      console.error('Failed to record reading history:', error);
      return;
    }

    setReadIds((previous) => [id, ...previous]);
  }, [readIds]);

  const markNotificationRead = useCallback(async (id: string) => {
    const now = new Date().toISOString();

    const { error } = await supabase
      .from('notifications')
      .update({ read_at: now })
      .eq('id', id);

    if (error) {
      throw error;
    }

    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    );
  }, []);

  const markAllNotificationsRead = useCallback(async () => {
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .is('read_at', null);

    if (error) {
      throw error;
    }

    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  }, []);

  const clearNotifications = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return;
    }

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      throw error;
    }

    setNotifications([]);
  }, []);

  const value = useMemo<CitadelContextValue>(
    () => ({
      snops,
      notifications,
      savedIds,
      readIds,
      loading,
      refreshing,
      error,
      savedCount: savedIds.size,
      readCount: readIds.length,
      refresh: () => loadData(true),
      toggleSaved,
      isSaved,
      markRead,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
    }),
    [
      snops,
      notifications,
      savedIds,
      readIds,
      loading,
      refreshing,
      error,
      loadData,
      toggleSaved,
      isSaved,
      markRead,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
    ],
  );

  return (
    <CitadelContext.Provider value={value}>
      {children}
    </CitadelContext.Provider>
  );
}

export function useCitadel() {
  const context = useContext(CitadelContext);

  if (!context) {
    throw new Error(
      'useCitadel must be used inside CitadelProvider',
    );
  }

  return context;
}