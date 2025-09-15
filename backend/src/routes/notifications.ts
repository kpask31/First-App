import express from 'express';
import { getNotifications, markAsRead, markAllAsRead, deleteNotification, getUnreadCount, updateNotificationSettings, getNotificationSettings, registerPushToken, unregisterPushToken } from '../controllers/notificationController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getNotifications);
router.patch('/:id/read', authenticate, markAsRead);
router.patch('/read-all', authenticate, markAllAsRead);
router.delete('/:id', authenticate, deleteNotification);
router.get('/unread-count', authenticate, getUnreadCount);
router.patch('/settings', authenticate, updateNotificationSettings);
router.get('/settings', authenticate, getNotificationSettings);
router.post('/push-token', authenticate, registerPushToken);
router.delete('/push-token', authenticate, unregisterPushToken);

export default router;