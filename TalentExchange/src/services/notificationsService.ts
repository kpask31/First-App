import { apiService } from './apiService';
import { Notification, ApiResponse } from '../types';

class NotificationsService {
  async getNotifications(page: number = 1): Promise<Notification[]> {
    const response = await apiService.get<ApiResponse<Notification[]>>(`/notifications?page=${page}`);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch notifications');
    }
    return response.data;
  }

  async markAsRead(notificationId: string): Promise<void> {
    const response = await apiService.patch<ApiResponse<void>>(`/notifications/${notificationId}/read`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to mark notification as read');
    }
  }

  async markAllAsRead(): Promise<void> {
    const response = await apiService.patch<ApiResponse<void>>('/notifications/read-all');
    if (!response.success) {
      throw new Error(response.message || 'Failed to mark all notifications as read');
    }
  }

  async deleteNotification(notificationId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/notifications/${notificationId}`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete notification');
    }
  }

  async getUnreadCount(): Promise<number> {
    const response = await apiService.get<ApiResponse<{ count: number }>>('/notifications/unread-count');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to get unread count');
    }
    return response.data.count;
  }

  async updateNotificationSettings(settings: Record<string, boolean>): Promise<void> {
    const response = await apiService.patch<ApiResponse<void>>('/notifications/settings', settings);
    if (!response.success) {
      throw new Error(response.message || 'Failed to update notification settings');
    }
  }

  async getNotificationSettings(): Promise<Record<string, boolean>> {
    const response = await apiService.get<ApiResponse<Record<string, boolean>>>('/notifications/settings');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to get notification settings');
    }
    return response.data;
  }

  async registerPushToken(token: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>('/notifications/push-token', { token });
    if (!response.success) {
      throw new Error(response.message || 'Failed to register push token');
    }
  }

  async unregisterPushToken(): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>('/notifications/push-token');
    if (!response.success) {
      throw new Error(response.message || 'Failed to unregister push token');
    }
  }
}

export const notificationsService = new NotificationsService();