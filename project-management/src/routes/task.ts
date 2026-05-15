import express from 'express';
import updateTask from '../controllers/task/updateTask';
import deleteTask from '../controllers/task/deleteTask';
import validateUpdateTask from '../middlewares/task/validateUpdateTask';
import getTaskById from '../controllers/task/getTaskById';

const router = express.Router();

/**
 * @route PUT /api/tasks/:taskId
 * @description Update a specific task
 */
router.put('/:taskId', validateUpdateTask, updateTask);

/**
 * @route DELETE /api/tasks/:taskId
 * @description Delete a specific task
 */
router.delete('/:taskId', deleteTask);

/**
 * @route GET /api/tasks/:taskId
 * @description Get a single task by its ID along with associated project details
 */
router.get('/:taskId', getTaskById);

export default router;
