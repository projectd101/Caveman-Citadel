import type { Reel } from '../types';

// Temporary local mock data for the Reels tab.
// Once a `reels` table exists in Supabase (project-scoped, same shape
// as `snops`), swap this for a CitadelContext-backed fetch — the
// screen already expects exactly this shape, so the swap is a
// one-line change in ReelsScreen.

export const MOCK_REELS: Reel[] = [
  {
    id: 'reel-1',
    projectHandle: 'citadel.daily',
    projectLabel: 'Science briefing',
    category: 'Science',
    mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    caption:
      'A three-year partnership between Florida State University and the Leon County Sheriff\u2019s Office reveals police de-escalation can be taught and measured in real settings.',
    likes: 274,
    comments: 18,
    accentColor: '#5B4FE0',
  },
  {
    id: 'reel-2',
    projectHandle: 'ubermenschly.build',
    projectLabel: 'Build log',
    category: 'AI',
    mediaUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800',
    caption:
      'Shipped the YouTube playlist curation flow tonight \u2014 social discovery layer is next on the list.',
    likes: 92,
    comments: 6,
    accentColor: '#C9A46A',
  },
  {
    id: 'reel-3',
    projectHandle: 'climbtomoon.dev',
    projectLabel: 'Devlog',
    category: 'Technology',
    mediaUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800',
    caption:
      'Liminal staircase lighting pass in Unity 6 URP \u2014 fog volumes finally behaving.',
    likes: 156,
    comments: 11,
    accentColor: '#3E6B8C',
  },
  {
    id: 'reel-4',
    projectHandle: 'sacredflame.app',
    projectLabel: 'Design note',
    category: 'AI',
    mediaUrl: 'https://images.unsplash.com/photo-1517816428104-797678c7cf0c?w=800',
    caption:
      'Wiring live wind data into the candle flicker simulation \u2014 the flame now reacts to real weather near you.',
    likes: 203,
    comments: 14,
    accentColor: '#C45C3E',
  },
];
