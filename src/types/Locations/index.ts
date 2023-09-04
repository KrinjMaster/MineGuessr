export interface Location {
  expand: {
    nearbyLocations: NearbyLocation[];
  };
  id: string;
  image: string[];
  nearbyLocations: NearbyLocation[];
}

export interface NearbyLocation {
  id: string;
  locationId: string;
  direction: number;
}