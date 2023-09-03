import type { Location } from "../types/Locations";
import { pb } from "./api";

class LocationService {
  async getLocation(id: string): Promise<Location | undefined> {
    return await pb.collection('locations').getOne(id);
  }
  getImageUrl(filename: string, record: {
    [key: string]: any;
  }) {
    return pb.files.getUrl(record, filename);
  }
}

export const locationService = new LocationService();