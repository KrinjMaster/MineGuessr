import { writable, type Writable } from 'svelte/store';
import type { User } from '../../types/Auth';

export const useUser: Writable<User | null> = writable(null); 

export function setUser(data: User) {
  useUser.set(data);
}