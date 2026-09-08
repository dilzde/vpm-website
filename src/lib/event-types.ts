export type EventDisplayMode = "details" | "poster_only" | "poster_details";

export interface SiteEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  isRecurring?: boolean;
  recurringDay?: string;
  posterUrl?: string | null;
  posterStoragePath?: string | null;
  displayMode?: EventDisplayMode;
  active: boolean;
  order: number;
}

