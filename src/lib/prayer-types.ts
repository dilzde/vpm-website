export interface PrayerRequest {
  id: string;
  name: string;
  category: string;
  request: string;
  isPrivate: boolean;
  source: "web" | "app";
  status: "pending" | "prayed" | "answered";
  submittedAt: string;
  email?: string;
  phone?: string;
}
