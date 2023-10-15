export interface Location {
  expand: {
    nearbyLocations: NearbyLocation[];
  };
  id: string;
  image: string[];
  cords: {
    x: number;
    z: number;  
  };
  nearbyLocations: NearbyLocation[];
}

export interface NearbyLocation {
  id: string;
  locationId: string;
  direction: number;
}