export interface SiteEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  posterUrl?: string | null;
  posterStoragePath?: string | null;
  active: boolean;
  order: number;
}
