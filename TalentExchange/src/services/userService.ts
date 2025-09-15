import { apiService } from './apiService';
import { User, Skill, Transaction, Review, ApiResponse } from '../types';

class UserService {
  async getUserProfile(userId: string): Promise<User> {
    const response = await apiService.get<ApiResponse<User>>(`/users/${userId}`);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch user profile');
    }
    return response.data;
  }

  async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await apiService.patch<ApiResponse<User>>('/users/profile', profileData);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to update profile');
    }
    return response.data;
  }

  async uploadProfileImage(imageFile: FormData): Promise<string> {
    const response = await apiService.uploadFile<ApiResponse<{ imageUrl: string }>>('/users/profile/image', imageFile);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to upload profile image');
    }
    return response.data.imageUrl;
  }

  async getUserSkills(): Promise<Skill[]> {
    const response = await apiService.get<ApiResponse<Skill[]>>('/users/skills');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch user skills');
    }
    return response.data;
  }

  async getAllSkills(): Promise<Skill[]> {
    const response = await apiService.get<ApiResponse<Skill[]>>('/skills');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch skills');
    }
    return response.data;
  }

  async addSkill(skillId: string): Promise<Skill> {
    const response = await apiService.post<ApiResponse<Skill>>('/users/skills', { skillId });
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to add skill');
    }
    return response.data;
  }

  async removeSkill(skillId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/users/skills/${skillId}`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to remove skill');
    }
  }

  async updateSkillProficiency(skillId: string, proficiency: 'beginner' | 'intermediate' | 'expert'): Promise<void> {
    const response = await apiService.patch<ApiResponse<void>>(`/users/skills/${skillId}`, { proficiency });
    if (!response.success) {
      throw new Error(response.message || 'Failed to update skill proficiency');
    }
  }

  async getTransactions(): Promise<Transaction[]> {
    const response = await apiService.get<ApiResponse<Transaction[]>>('/users/transactions');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch transactions');
    }
    return response.data;
  }

  async getCreditBalance(): Promise<number> {
    const response = await apiService.get<ApiResponse<{ balance: number }>>('/users/credits/balance');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch credit balance');
    }
    return response.data.balance;
  }

  async purchaseCredits(amount: number, paymentMethodId: string): Promise<Transaction> {
    const response = await apiService.post<ApiResponse<Transaction>>('/users/credits/purchase', {
      amount,
      paymentMethodId,
    });
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to purchase credits');
    }
    return response.data;
  }

  async getUserReviews(userId: string): Promise<Review[]> {
    const response = await apiService.get<ApiResponse<Review[]>>(`/users/${userId}/reviews`);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch user reviews');
    }
    return response.data;
  }

  async submitReview(taskId: string, revieweeId: string, reviewData: Omit<Review, 'id' | 'taskId' | 'reviewerId' | 'revieweeId' | 'createdAt'>): Promise<Review> {
    const response = await apiService.post<ApiResponse<Review>>(`/tasks/${taskId}/review`, {
      revieweeId,
      ...reviewData,
    });
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to submit review');
    }
    return response.data;
  }

  async reportUser(userId: string, reason: string, description?: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/users/${userId}/report`, {
      reason,
      description,
    });
    if (!response.success) {
      throw new Error(response.message || 'Failed to report user');
    }
  }

  async blockUser(userId: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/users/${userId}/block`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to block user');
    }
  }

  async unblockUser(userId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/users/${userId}/block`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to unblock user');
    }
  }

  async getBlockedUsers(): Promise<User[]> {
    const response = await apiService.get<ApiResponse<User[]>>('/users/blocked');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch blocked users');
    }
    return response.data;
  }

  async verifyIdentity(documentFile: FormData): Promise<void> {
    const response = await apiService.uploadFile<ApiResponse<void>>('/users/verify-identity', documentFile);
    if (!response.success) {
      throw new Error(response.message || 'Failed to submit identity verification');
    }
  }

  async updateAvailability(isAvailable: boolean): Promise<void> {
    const response = await apiService.patch<ApiResponse<void>>('/users/availability', { isAvailable });
    if (!response.success) {
      throw new Error(response.message || 'Failed to update availability');
    }
  }

  async searchUsers(query: string, filters?: any): Promise<User[]> {
    const params = new URLSearchParams({ query });

    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null) {
          params.append(key, filters[key].toString());
        }
      });
    }

    const response = await apiService.get<ApiResponse<User[]>>(`/users/search?${params.toString()}`);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to search users');
    }
    return response.data;
  }
}

export const userService = new UserService();