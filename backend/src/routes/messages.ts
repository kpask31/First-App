import express from 'express';
import { getConversations, getMessages, sendMessage, sendFileMessage, createConversation, markAsRead, deleteMessage, archiveConversation, searchMessages, getUnreadCount } from '../controllers/messageController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/conversations', authenticate, getConversations);
router.post('/conversations', authenticate, createConversation);
router.get('/conversations/:id/messages', authenticate, getMessages);
router.post('/conversations/:id/messages', authenticate, sendMessage);
router.post('/conversations/:id/files', authenticate, sendFileMessage);
router.post('/conversations/:id/read', authenticate, markAsRead);
router.post('/conversations/:id/archive', authenticate, archiveConversation);
router.delete('/:id', authenticate, deleteMessage);
router.get('/search', authenticate, searchMessages);
router.get('/unread-count', authenticate, getUnreadCount);

export default router;