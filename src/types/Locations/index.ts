export interface Location {
  id: string;
  image: string[];
  nearbyLocations: NearbyLocation[];
}

export interface NearbyLocation {
  id: string;
  locationId: string;
  direction: string;
}