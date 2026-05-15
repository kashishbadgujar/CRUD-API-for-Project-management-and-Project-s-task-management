import express from 'express';
import createProject from '../controllers/project/createProject';
import getProjects from '../controllers/project/getProjects';
import updateProject from '../controllers/project/updateProject';
import deleteProject from '../controllers/project/deleteProject';
import validateCreateProject from '../middlewares/project/validateCreateProject';
import validateUpdateProject from '../middlewares/project/validateUpdateProject';
import getTasksByProject from '../controllers/task/getTasksByProject';
import validateCreateTask from '../middlewares/task/validateCreateTask';
import createTask from '../controllers/task/createTask';
import getProjectById from '../controllers/project/getProjectById';

const router = express.Router();

/**
 * @route POST /api/projects/create
 * @description Create a new project
 */
router.post('/create', validateCreateProject, createProject);

/**
 * @route GET /api/projects
 * @description Get all projects
 */
router.get('/', getProjects);

/**
 * @route PUT /api/projects/:projectId
 * @description Update a specific project
 */
router.put('/:projectId', validateUpdateProject, updateProject);

/**
 * @route DELETE /api/projects/:projectId
 * @description Delete a specific project
 */
router.delete('/:projectId', deleteProject);

/**
 * @route POST /api/projects/:projectId/tasks/create
 * @description Create a new task for a specific project
 */
router.post('/:projectId/tasks/create', validateCreateTask, createTask);

/**
 * @route GET /api/projects/:projectId/tasks
 * @description Get all tasks belonging to a specific project
 */
router.get('/:projectId/tasks', getTasksByProject);

/**
 * @route GET /api/projects/:projectId
 * @description Get a single project by its ID along with associated tasks
 */
router.get('/:projectId', getProjectById);

export default router;
