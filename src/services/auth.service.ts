import type { AuthModel, RecordModel } from 'pocketbase';
import type { LoginResponse } from '../types/API';
import { pb } from './api';

class AuthService {
  async loginOAuth(provider: string): Promise<RecordModel> {
    const result = await pb.collection('users').authWithOAuth2({ 
      provider,
    });

    const meta = result.meta

    if (meta && meta.isNew) {
      await pb.collection('users').update(result.record.id, {
        name: meta.name,
        avatar: meta.avatarUrl,
      })
    }

    return result.meta as RecordModel;
  }

  getCurrentUser(): AuthModel {
    return pb.authStore.model;
  }

  logout() {
    return pb.authStore.clear();
  }
}

export const authService = new AuthService();