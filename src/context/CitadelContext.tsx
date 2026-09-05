import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { mockNotifications } from '../data/mockNotifications';
import { mockSnops } from '../data/mockSnops';
import type { AppNotification, Snop } from '../types';

type CitadelContextValue = {
  snops: Snop[];
  notifications: AppNotification[];
  savedIds: Set<string>;
  readIds: string[];
  snopsReadCount: number;
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  markRead: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
};

const CitadelContext = createContext<CitadelContextValue | null>(null);

const INITIAL_READ = 42;

export function CitadelProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<Set<string>>(
    () => new Set(mockSnops.filter((s) => s.saved).map((s) => s.id)),
  );
  const [readIds, setReadIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [extraReads, setExtraReads] = useState(0);

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => savedIds.has(id), [savedIds]);

  const markRead = useCallback((id: string) => {
    setReadIds((prev) => {
      if (prev.includes(id)) {
        return prev;
      }
      setExtraReads((n) => n + 1);
      return [id, ...prev];
    });
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = useMemo(
    () => ({
      snops: mockSnops,
      notifications,
      savedIds,
      readIds,
      snopsReadCount: INITIAL_READ + extraReads,
      toggleSaved,
      isSaved,
      markRead,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
    }),
    [
      notifications,
      savedIds,
      readIds,
      extraReads,
      toggleSaved,
      isSaved,
      markRead,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
    ],
  );

  return <CitadelContext.Provider value={value}>{children}</CitadelContext.Provider>;
}

export function useCitadel() {
  const ctx = useContext(CitadelContext);
  if (!ctx) {
    throw new Error('useCitadel must be used within CitadelProvider');
  }
  return ctx;
}
