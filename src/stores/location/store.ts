import { writable, type Writable } from 'svelte/store';
import type { PageData } from '../../routes/[mapId]/$types.js'
import { locationService } from '../../services/location.service.js';

export const location: Writable<PageData | null> = writable(null);
export const isNeededToRefresh: Writable<boolean> = writable(false);

export function setLocation(data: PageData | null) {
  location.set(data);
}

export async function setNewLocation(id: string, map: string) {
  const result = await locationService.getLocation(id, map);

  if (result && window) {
    localStorage.setItem('location', result.id)

    location.set({
      ...result,
      nearbyLocations: result.expand ? result.expand.nearbyLocations : [],
      image: result.image.map((image) => locationService.getImageUrl(image, result)),
    });

    isNeededToRefresh.set(true);
  }
} 

export async function setNewRandomLocation(map: string) {
  const result = (await locationService.getRandomLocation(map))[Math.ceil(Math.random() * 3)];

  if (result && window) {
    localStorage.setItem('location', result.id)

    location.set({
      ...result,
      nearbyLocations: result.expand ? result.expand.nearbyLocations : [],
      image: result.image.map((image) => locationService.getImageUrl(image, result)),
    });
  }
} 