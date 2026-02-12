
export interface MarketEntity {
  id: string;
  name: string;
  category: 'Shop' | 'Coaching' | 'Service';
  floor: string;
  floorNumber: number; // 0 for Ground, 1 for 1st, etc.
  side?: 'Left' | 'Right';
  specialty?: string;
  owner: string;
  contact: string;
  status: 'Open' | 'Closed';
  imageUrl?: string; // New field for shop/coaching image
}

export interface MarketNews {
  id: string;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
  sourceUrl?: string;
  category?: string;
  sourceName?: string;
}

export interface OccupancyStats {
  totalUnits: number;
  occupied: number;
  byFloor: {
    floor: string;
    count: number;
    color: string;
  }[];
}
