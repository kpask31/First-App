import express from 'express';
import { register, login, logout, getCurrentUser, refreshToken, forgotPassword, resetPassword, verifyEmail, verifyPhone, sendPhoneVerification } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getCurrentUser);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);
router.post('/verify-phone', authenticate, verifyPhone);
router.post('/send-phone-verification', authenticate, sendPhoneVerification);

export default router;