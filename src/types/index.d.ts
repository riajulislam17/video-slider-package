interface VideoConfig {
  autoplay?: boolean;
  mute?: boolean;
  loop?: boolean;
  controls?: boolean;
  modestBranding?: boolean;
  rel?: boolean;
  showInfo?: boolean;
  facebookAllowFullscreen?: boolean;
  show_text?: boolean;
}

interface Product {
  id: string;
  slug?: string;
  title: string;
  price: number;
  discountPrice?: number;
  videoUrl: string;
  currency?: string;
}

interface Layout {
  desktop: { column: number; row: number };
  tablet: { column: number; row: number };
  mobile: { column: number; row: number };
}
