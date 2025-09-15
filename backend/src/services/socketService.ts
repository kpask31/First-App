import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

export const setupSocketIO = (io: Server) => {
  // Authentication middleware for socket connections
  io.use(async (socket: any, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: string };
      const user = await User.findById(decoded.userId);

      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user._id.toString();
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`User ${socket.userId} connected to socket`);

    // Join user to their own room for personal notifications
    socket.join(`user:${socket.userId}`);

    // Handle joining conversation rooms
    socket.on('join_conversation', (conversationId: string) => {
      socket.join(`conversation:${conversationId}`);
      console.log(`User ${socket.userId} joined conversation ${conversationId}`);
    });

    // Handle leaving conversation rooms
    socket.on('leave_conversation', (conversationId: string) => {
      socket.leave(`conversation:${conversationId}`);
      console.log(`User ${socket.userId} left conversation ${conversationId}`);
    });

    // Handle real-time message sending
    socket.on('send_message', (data: { conversationId: string; message: any }) => {
      // Broadcast to all users in the conversation except the sender
      socket.to(`conversation:${data.conversationId}`).emit('new_message', data.message);
    });

    // Handle typing indicators
    socket.on('typing_start', (data: { conversationId: string }) => {
      socket.to(`conversation:${data.conversationId}`).emit('user_typing', {
        userId: socket.userId,
        conversationId: data.conversationId,
      });
    });

    socket.on('typing_stop', (data: { conversationId: string }) => {
      socket.to(`conversation:${data.conversationId}`).emit('user_stop_typing', {
        userId: socket.userId,
        conversationId: data.conversationId,
      });
    });

    // Handle task status updates
    socket.on('task_status_update', (data: { taskId: string; status: string; userId: string }) => {
      // Notify the specific user about task updates
      io.to(`user:${data.userId}`).emit('task_updated', {
        taskId: data.taskId,
        status: data.status,
      });
    });

    // Handle proposal notifications
    socket.on('proposal_submitted', (data: { taskOwnerId: string; proposal: any }) => {
      io.to(`user:${data.taskOwnerId}`).emit('new_proposal', data.proposal);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`User ${socket.userId} disconnected from socket`);
    });
  });

  return io;
};

// Helper functions to emit events from other parts of the application
export const emitToUser = (io: Server, userId: string, event: string, data: any) => {
  io.to(`user:${userId}`).emit(event, data);
};

export const emitToConversation = (io: Server, conversationId: string, event: string, data: any) => {
  io.to(`conversation:${conversationId}`).emit(event, data);
};