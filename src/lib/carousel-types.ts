export interface CarouselSlide {
  id: string;
  slot: "support" | "booking" | "home";
  title: string;
  body: string;
  ctaLabel: string;
  ctaLink?: string;
  imageUrl?: string;
  active: boolean;
  order: number;
}
