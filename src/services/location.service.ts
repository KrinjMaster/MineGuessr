import type { Location } from '../types/Locations';
import { pb } from './api';

class LocationService {
  async getLocation(id: string, collection: string): Promise<Location | undefined> {
    return await pb.collection(`${collection}_locations`).getOne(id, {
      expand: 'nearbyLocations'
    });
  }
  getImageUrl(filename: string, record: {
    [key: string]: any;
  }) {
    return pb.files.getUrl(record, filename);
  }
  async getRandomLocation(map: string): Promise<Location[]> {
    return await pb.collection(`${map}_locations`).getFullList({
      expand: 'nearbyLocations',
      sort: '@random'
    })
  }
}

export const locationService = new LocationService();