import type { Location, NearbyLocation } from "../types/Locations";
import { pb } from "./api";

class LocationService {
  async getLocation(id: string): Promise<Location | undefined> {
    return await pb.collection('sp1_locations').getOne(id, {
      expand: 'nearbyLocations'
    });
  }
  getImageUrl(filename: string, record: {
    [key: string]: any;
  }) {
    return pb.files.getUrl(record, filename);
  }
  async getRandomLocation(): Promise<NearbyLocation[]> {
    return await pb.collection('sp1_locations').getFullList({
      sort: '@random'
    })
  }
}

export const locationService = new LocationService();