export interface FaceBoundingBox {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
}

export interface DetectedFace {
  id: string;
  name: string;
  confidence: number;
  isUser?: boolean;
  isVip?: boolean;
  table?: string;
  box: FaceBoundingBox;
  avatarUrl?: string;
}

export interface PhotoCapture {
  id: string;
  filename: string;
  url: string;
  thumbnailUrl?: string;
  timestamp: string;
  relativeTime: string;
  camera: string;
  lens: string;
  shutter: string;
  aperture: string;
  iso: string;
  megapixels: string;
  fileSize: string;
  faces: DetectedFace[];
  category: 'solo' | 'couple' | 'group' | 'toast';
  tableNumber: string;
  status: 'matched' | 'processing' | 'review';
  isFavorite?: boolean;
  isExcludedFromProjector?: boolean;
  description?: string;
  isUserMatch?: boolean;
}

export interface LeadActivity {
  id: string;
  type: 'purchase' | 'selfie_unlock' | 'crowdsource' | 'batch_sync' | 'qr_scan';
  title: string;
  description: string;
  timestamp: string;
  relativeTime: string;
  email?: string;
  igHandle?: string;
  amount?: number;
  table?: string;
}

export interface TableKitSettings {
  archetype: 'tent' | 'card' | 'arch' | 'easel';
  headline: string;
  subtitle: string;
  venue: string;
  date: string;
  colorProfile: 'obsidian' | 'ivory' | 'navy' | 'gold';
  tableNumber: string;
  qrEmblem: 'bolt' | 'monogram' | 'camera';
  ctaHeadline: string;
  guestGuide: string;
  autoPartition: boolean;
  includeScoreLine: boolean;
  leadGate: boolean;
}

export type AppViewMode =
  | 'ingestion-monitor'
  | 'guest-face-cam'
  | 'guest-gallery'
  | 'qr-and-table-kits'
  | 'live-slideshow-kiosk'
  | 'guest-leads-and-analytics'
  | 'print-lab-and-fulfillment'
  | 'settings';
