import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User, Skill, Transaction } from '../../types';
import { userService } from '../../services/userService';

interface UserState {
  profile: User | null;
  skills: Skill[];
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  skills: [],
  transactions: [],
  isLoading: false,
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const user = await userService.getUserProfile(userId);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch user profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: Partial<User>, { rejectWithValue }) => {
    try {
      const updatedUser = await userService.updateProfile(profileData);
      return updatedUser;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);

export const fetchUserSkills = createAsyncThunk(
  'user/fetchSkills',
  async (_, { rejectWithValue }) => {
    try {
      const skills = await userService.getUserSkills();
      return skills;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch skills');
    }
  }
);

export const addUserSkill = createAsyncThunk(
  'user/addSkill',
  async (skillId: string, { rejectWithValue }) => {
    try {
      const skill = await userService.addSkill(skillId);
      return skill;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add skill');
    }
  }
);

export const removeUserSkill = createAsyncThunk(
  'user/removeSkill',
  async (skillId: string, { rejectWithValue }) => {
    try {
      await userService.removeSkill(skillId);
      return skillId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove skill');
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'user/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const transactions = await userService.getTransactions();
      return transactions;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch transactions');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateCreditBalance: (state, action) => {
      if (state.profile) {
        state.profile.creditBalance = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // Fetch skills
      .addCase(fetchUserSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
      })

      // Add skill
      .addCase(addUserSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })

      // Remove skill
      .addCase(removeUserSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter(skill => skill.id !== action.payload);
      })

      // Fetch transactions
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      });
  },
});

export const { clearError, updateCreditBalance } = userSlice.actions;
export default userSlice.reducer;