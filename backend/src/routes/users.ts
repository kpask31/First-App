import express from 'express';
import { getUserProfile, updateProfile, uploadProfileImage, getUserSkills, addSkill, removeSkill, getTransactions, getCreditBalance, purchaseCredits, getUserReviews, searchUsers } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/:id', authenticate, getUserProfile);
router.patch('/profile', authenticate, updateProfile);
router.post('/profile/image', authenticate, uploadProfileImage);
router.get('/skills', authenticate, getUserSkills);
router.post('/skills', authenticate, addSkill);
router.delete('/skills/:skillId', authenticate, removeSkill);
router.get('/transactions', authenticate, getTransactions);
router.get('/credits/balance', authenticate, getCreditBalance);
router.post('/credits/purchase', authenticate, purchaseCredits);
router.get('/:id/reviews', authenticate, getUserReviews);
router.get('/search', authenticate, searchUsers);

export default router;