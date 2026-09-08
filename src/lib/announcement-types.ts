export interface Announcement {
  id: string;
  headline: string;
  body: string;
  imageUrl?: string;
  dateBadge?: string;
  time?: string;
  active: boolean;
  order: number;
}
