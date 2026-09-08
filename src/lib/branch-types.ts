export interface Branch {
  id: string;
  name: string;
  region: string;
  location: string;
  phone: string;
  mapsUrl: string;
  badge?: string;
  isFeatured?: boolean;
  active: boolean;
  order: number;
}
