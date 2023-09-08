import { writable, type Writable } from 'svelte/store';
import type { PageData } from '../../routes/testing/$types.js'

export const location: Writable<PageData | null> = writable(null);

export function setLocation(data: PageData) {
 location.set(data);
}