import { Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';

export const register = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const verifyPhone = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});

export const sendPhoneVerification = asyncHandler(async (req: Request, res: Response) => {
  res.status(501).json({ success: false, message: 'Not implemented yet' });
});