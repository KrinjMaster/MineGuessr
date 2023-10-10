import { writable, type Writable } from 'svelte/store';
import type { Auth } from '../../types/Auth';
import { authService } from '../../services/auth.service';

export const useAuth: Writable<Auth | null> = writable({
  isLoggedIn: false,
}); 


export function setIsLoggedIn(value: boolean)  {
  useAuth.set({ isLoggedIn: value});
}

export function oauthLogin(provider: string) {
  return authService.loginOAuth(provider);
}