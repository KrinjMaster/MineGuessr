import { writable, type Writable } from 'svelte/store';
import type { MarkersConfig } from '../../utils/OL/ol.js';

export const olConfig: Writable<MarkersConfig | null> = writable({
  isEnabled: true,
  markers: []
}); 

export function setOlConfig(data: MarkersConfig) {
 olConfig.set(data);
}