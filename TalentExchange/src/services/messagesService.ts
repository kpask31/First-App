import { apiService } from './apiService';
import { Message, Conversation, ApiResponse } from '../types';

class MessagesService {
  async getConversations(): Promise<Conversation[]> {
    const response = await apiService.get<ApiResponse<Conversation[]>>('/messages/conversations');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch conversations');
    }
    return response.data;
  }

  async getMessages(conversationId: string, page: number = 1): Promise<Message[]> {
    const response = await apiService.get<ApiResponse<Message[]>>(`/messages/conversations/${conversationId}/messages?page=${page}`);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch messages');
    }
    return response.data;
  }

  async sendMessage(conversationId: string, content: string, messageType: Message['messageType'] = 'text'): Promise<Message> {
    const response = await apiService.post<ApiResponse<Message>>(`/messages/conversations/${conversationId}/messages`, {
      content,
      messageType,
    });
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to send message');
    }
    return response.data;
  }

  async sendFileMessage(conversationId: string, file: FormData): Promise<Message> {
    const response = await apiService.uploadFile<ApiResponse<Message>>(`/messages/conversations/${conversationId}/files`, file);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to send file');
    }
    return response.data;
  }

  async createConversation(participantIds: string[], taskId?: string): Promise<Conversation> {
    const response = await apiService.post<ApiResponse<Conversation>>('/messages/conversations', {
      participantIds,
      taskId,
    });
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to create conversation');
    }
    return response.data;
  }

  async markAsRead(conversationId: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/messages/conversations/${conversationId}/read`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to mark as read');
    }
  }

  async deleteMessage(messageId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/messages/${messageId}`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete message');
    }
  }

  async archiveConversation(conversationId: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/messages/conversations/${conversationId}/archive`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to archive conversation');
    }
  }

  async unarchiveConversation(conversationId: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/messages/conversations/${conversationId}/unarchive`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to unarchive conversation');
    }
  }

  async searchMessages(query: string, conversationId?: string): Promise<Message[]> {
    const params = new URLSearchParams({ query });
    if (conversationId) {
      params.append('conversationId', conversationId);
    }

    const response = await apiService.get<ApiResponse<Message[]>>(`/messages/search?${params.toString()}`);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to search messages');
    }
    return response.data;
  }

  async getUnreadCount(): Promise<number> {
    const response = await apiService.get<ApiResponse<{ count: number }>>('/messages/unread-count');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to get unread count');
    }
    return response.data.count;
  }

  async reportMessage(messageId: string, reason: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/messages/${messageId}/report`, { reason });
    if (!response.success) {
      throw new Error(response.message || 'Failed to report message');
    }
  }
}

export const messagesService = new MessagesService();