import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskFilters, Proposal } from '../../types';
import { tasksService } from '../../services/tasksService';

interface TasksState {
  tasks: Task[];
  currentTask: Task | null;
  proposals: Proposal[];
  myTasks: Task[];
  isLoading: boolean;
  error: string | null;
  filters: TaskFilters;
  pagination: {
    page: number;
    pageSize: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

const initialState: TasksState = {
  tasks: [],
  currentTask: null,
  proposals: [],
  myTasks: [],
  isLoading: false,
  error: null,
  filters: {},
  pagination: {
    page: 1,
    pageSize: 20,
    totalCount: 0,
    hasNextPage: false,
  },
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ page = 1, filters }: { page?: number; filters?: TaskFilters }, { rejectWithValue }) => {
    try {
      const response = await tasksService.getTasks(page, filters);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch tasks');
    }
  }
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const task = await tasksService.getTaskById(taskId);
      return task;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch task');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>, { rejectWithValue }) => {
    try {
      const task = await tasksService.createTask(taskData);
      return task;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create task');
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, data }: { id: string; data: Partial<Task> }, { rejectWithValue }) => {
    try {
      const task = await tasksService.updateTask(id, data);
      return task;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update task');
    }
  }
);

export const fetchMyTasks = createAsyncThunk(
  'tasks/fetchMyTasks',
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await tasksService.getMyTasks();
      return tasks;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch my tasks');
    }
  }
);

export const fetchProposalsForTask = createAsyncThunk(
  'tasks/fetchProposals',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const proposals = await tasksService.getProposalsForTask(taskId);
      return proposals;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch proposals');
    }
  }
);

export const submitProposal = createAsyncThunk(
  'tasks/submitProposal',
  async ({ taskId, proposal }: { taskId: string; proposal: Omit<Proposal, 'id' | 'taskId' | 'providerId' | 'status' | 'createdAt' | 'updatedAt'> }, { rejectWithValue }) => {
    try {
      const newProposal = await tasksService.submitProposal(taskId, proposal);
      return newProposal;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to submit proposal');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<TaskFilters>) => {
      state.filters = action.payload;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    updateTaskStatus: (state, action: PayloadAction<{ taskId: string; status: Task['status'] }>) => {
      const { taskId, status } = action.payload;

      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].status = status;
      }

      const myTaskIndex = state.myTasks.findIndex(task => task.id === taskId);
      if (myTaskIndex !== -1) {
        state.myTasks[myTaskIndex].status = status;
      }

      if (state.currentTask && state.currentTask.id === taskId) {
        state.currentTask.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.meta.arg.page === 1) {
          state.tasks = action.payload.items;
        } else {
          state.tasks = [...state.tasks, ...action.payload.items];
        }
        state.pagination = {
          page: action.payload.page,
          pageSize: action.payload.pageSize,
          totalCount: action.payload.totalCount,
          hasNextPage: action.payload.hasNextPage,
        };
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch task by ID
      .addCase(fetchTaskById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Create task
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.unshift(action.payload);
        state.myTasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = updatedTask;
        }

        const myTaskIndex = state.myTasks.findIndex(task => task.id === updatedTask.id);
        if (myTaskIndex !== -1) {
          state.myTasks[myTaskIndex] = updatedTask;
        }

        if (state.currentTask && state.currentTask.id === updatedTask.id) {
          state.currentTask = updatedTask;
        }
      })

      // Fetch my tasks
      .addCase(fetchMyTasks.fulfilled, (state, action) => {
        state.myTasks = action.payload;
      })

      // Fetch proposals
      .addCase(fetchProposalsForTask.fulfilled, (state, action) => {
        state.proposals = action.payload;
      })

      // Submit proposal
      .addCase(submitProposal.fulfilled, (state, action) => {
        state.proposals.push(action.payload);
      });
  },
});

export const { clearError, setFilters, clearCurrentTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;