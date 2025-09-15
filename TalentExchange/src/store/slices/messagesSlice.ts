import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Message, Conversation } from '../../types';
import { messagesService } from '../../services/messagesService';

interface MessagesState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  'messages/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const conversations = await messagesService.getConversations();
      return conversations;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch conversations');
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (conversationId: string, { rejectWithValue }) => {
    try {
      const messages = await messagesService.getMessages(conversationId);
      return messages;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch messages');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async ({ conversationId, content, messageType }: { conversationId: string; content: string; messageType: Message['messageType'] }, { rejectWithValue }) => {
    try {
      const message = await messagesService.sendMessage(conversationId, content, messageType);
      return message;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to send message');
    }
  }
);

export const markAsRead = createAsyncThunk(
  'messages/markAsRead',
  async (conversationId: string, { rejectWithValue }) => {
    try {
      await messagesService.markAsRead(conversationId);
      return conversationId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to mark as read');
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);

      const conversationIndex = state.conversations.findIndex(
        conv => conv.id === action.payload.conversationId
      );
      if (conversationIndex !== -1) {
        state.conversations[conversationIndex].lastMessage = action.payload;
        state.conversations[conversationIndex].updatedAt = action.payload.createdAt;
      }
    },
    updateMessageStatus: (state, action) => {
      const { messageId, isRead } = action.payload;
      const messageIndex = state.messages.findIndex(msg => msg.id === messageId);
      if (messageIndex !== -1) {
        state.messages[messageIndex].isRead = isRead;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch conversations
      .addCase(fetchConversations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Send message
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })

      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const conversationIndex = state.conversations.findIndex(
          conv => conv.id === action.payload
        );
        if (conversationIndex !== -1) {
          state.conversations[conversationIndex].unreadCount = 0;
        }
      });
  },
});

export const { clearError, setCurrentConversation, addMessage, updateMessageStatus } = messagesSlice.actions;
export default messagesSlice.reducer;