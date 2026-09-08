export interface SiteImage {
  id: string;
  slot: "hero" | "gallery" | "about" | "branches" | "media";
  url: string;           // e.g. /images/hero/photo.jpg
  storagePath: string;   // e.g. public/images/hero/photo.jpg (for deletion)
  caption?: string;
  order: number;
  active: boolean;
}
