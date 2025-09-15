import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';

export const getConversations = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const sendFileMessage = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const createConversation = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const markAsRead = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const archiveConversation = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const searchMessages = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});