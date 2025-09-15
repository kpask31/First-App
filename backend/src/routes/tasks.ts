import express from 'express';
import { getTasks, getTaskById, createTask, updateTask, deleteTask, getMyTasks, getAssignedTasks, getProposalsForTask, submitProposal, acceptProposal, declineProposal, withdrawProposal, submitWork, approveWork, requestRevision, cancelTask } from '../controllers/taskController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getTasks);
router.get('/my-tasks', authenticate, getMyTasks);
router.get('/assigned', authenticate, getAssignedTasks);
router.post('/', authenticate, createTask);
router.get('/:id', authenticate, getTaskById);
router.patch('/:id', authenticate, updateTask);
router.delete('/:id', authenticate, deleteTask);
router.get('/:id/proposals', authenticate, getProposalsForTask);
router.post('/:id/proposals', authenticate, submitProposal);
router.post('/proposals/:proposalId/accept', authenticate, acceptProposal);
router.post('/proposals/:proposalId/decline', authenticate, declineProposal);
router.post('/proposals/:proposalId/withdraw', authenticate, withdrawProposal);
router.post('/:id/submit', authenticate, submitWork);
router.post('/:id/approve', authenticate, approveWork);
router.post('/:id/request-revision', authenticate, requestRevision);
router.post('/:id/cancel', authenticate, cancelTask);

export default router;