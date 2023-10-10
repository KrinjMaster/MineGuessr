import type { LoginResponse } from '../types/API';
import { pb } from './api';

class AuthService {
  async loginOAuth(provider: string): Promise<LoginResponse> {
    const result = await pb
      .collection('users')
      .authWithOAuth2({ provider });
    return result.meta as LoginResponse;
  }
}

export const authService = new AuthService();