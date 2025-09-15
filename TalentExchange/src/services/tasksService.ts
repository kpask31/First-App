import { apiService } from './apiService';
import { Task, TaskFilters, Proposal, PaginatedResponse, ApiResponse } from '../types';

class TasksService {
  async getTasks(page: number = 1, filters?: TaskFilters): Promise<PaginatedResponse<Task>> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: '20',
    });

    if (filters) {
      if (filters.skills && filters.skills.length > 0) {
        params.append('skills', filters.skills.join(','));
      }
      if (filters.creditRange) {
        params.append('minCredits', filters.creditRange[0].toString());
        params.append('maxCredits', filters.creditRange[1].toString());
      }
      if (filters.location) {
        params.append('location', filters.location);
      }
      if (filters.radius) {
        params.append('radius', filters.radius.toString());
      }
      if (filters.taskType) {
        params.append('taskType', filters.taskType);
      }
      if (filters.experienceLevel) {
        params.append('experienceLevel', filters.experienceLevel);
      }
      if (filters.datePosted) {
        params.append('datePosted', filters.datePosted);
      }
      if (filters.sortBy) {
        params.append('sortBy', filters.sortBy);
      }
    }

    const response = await apiService.get<ApiResponse<PaginatedResponse<Task>>>(`/tasks?${params.toString()}`);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch tasks');
    }
    return response.data;
  }

  async getTaskById(taskId: string): Promise<Task> {
    const response = await apiService.get<ApiResponse<Task>>(`/tasks/${taskId}`);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch task');
    }
    return response.data;
  }

  async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Task> {
    const response = await apiService.post<ApiResponse<Task>>('/tasks', taskData);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to create task');
    }
    return response.data;
  }

  async updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
    const response = await apiService.patch<ApiResponse<Task>>(`/tasks/${taskId}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to update task');
    }
    return response.data;
  }

  async deleteTask(taskId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<void>>(`/tasks/${taskId}`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to delete task');
    }
  }

  async getMyTasks(): Promise<Task[]> {
    const response = await apiService.get<ApiResponse<Task[]>>('/tasks/my-tasks');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch my tasks');
    }
    return response.data;
  }

  async getAssignedTasks(): Promise<Task[]> {
    const response = await apiService.get<ApiResponse<Task[]>>('/tasks/assigned');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch assigned tasks');
    }
    return response.data;
  }

  async getProposalsForTask(taskId: string): Promise<Proposal[]> {
    const response = await apiService.get<ApiResponse<Proposal[]>>(`/tasks/${taskId}/proposals`);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to fetch proposals');
    }
    return response.data;
  }

  async submitProposal(taskId: string, proposal: Omit<Proposal, 'id' | 'taskId' | 'providerId' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Proposal> {
    const response = await apiService.post<ApiResponse<Proposal>>(`/tasks/${taskId}/proposals`, proposal);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to submit proposal');
    }
    return response.data;
  }

  async updateProposal(proposalId: string, data: Partial<Proposal>): Promise<Proposal> {
    const response = await apiService.patch<ApiResponse<Proposal>>(`/proposals/${proposalId}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to update proposal');
    }
    return response.data;
  }

  async acceptProposal(proposalId: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/proposals/${proposalId}/accept`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to accept proposal');
    }
  }

  async declineProposal(proposalId: string, reason?: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/proposals/${proposalId}/decline`, { reason });
    if (!response.success) {
      throw new Error(response.message || 'Failed to decline proposal');
    }
  }

  async withdrawProposal(proposalId: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/proposals/${proposalId}/withdraw`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to withdraw proposal');
    }
  }

  async submitWork(taskId: string, files: string[], message?: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/tasks/${taskId}/submit`, {
      files,
      message,
    });
    if (!response.success) {
      throw new Error(response.message || 'Failed to submit work');
    }
  }

  async approveWork(taskId: string, feedback?: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/tasks/${taskId}/approve`, { feedback });
    if (!response.success) {
      throw new Error(response.message || 'Failed to approve work');
    }
  }

  async requestRevision(taskId: string, feedback: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/tasks/${taskId}/request-revision`, { feedback });
    if (!response.success) {
      throw new Error(response.message || 'Failed to request revision');
    }
  }

  async cancelTask(taskId: string, reason?: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/tasks/${taskId}/cancel`, { reason });
    if (!response.success) {
      throw new Error(response.message || 'Failed to cancel task');
    }
  }

  async uploadTaskAttachment(taskId: string, file: FormData): Promise<string> {
    const response = await apiService.uploadFile<ApiResponse<{ fileUrl: string }>>(`/tasks/${taskId}/attachments`, file);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to upload attachment');
    }
    return response.data.fileUrl;
  }
}

export const tasksService = new TasksService();