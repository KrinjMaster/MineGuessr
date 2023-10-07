export interface Region {
  x: number;
  z: number;
  m: Uint32Array;
}

export interface Marker {
  x: number;
  z: number;
  image: string;
  imageAnchor: number[];
  imageScale: number;
}

export interface MarkersConfig {
  isEnabled: boolean;
  markers: Marker[]
}