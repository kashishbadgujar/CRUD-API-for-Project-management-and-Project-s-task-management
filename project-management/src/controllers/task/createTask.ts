import { Request, Response } from 'express';
import { models } from '../../models';
import logger from '../../utils/helpers/logger';
import { ApiResponse, TaskAttributes, TaskRequestBodyType } from '../../utils/types';

const { Task, Project } = models;

type CreateTaskParamsType = {
  projectId: string;
};

/**
 * @description Creates a new task under a specific project.
 *
 * @route POST /api/projects/:projectId/tasks/create
 *
 * @param {Request<CreateTaskParamsType, unknown, TaskRequestBodyType>} req
 * @param {Response<ApiResponse<TaskAttributes>>} res
 *
 * @returns {Promise<Response>} Returns created task data
 *
 * @throws {404} If project not found
 * @throws {500} If task creation fails
 */
const createTask = async (
  req: Request<CreateTaskParamsType, unknown, TaskRequestBodyType>,
  res: Response<ApiResponse<TaskAttributes>>,
) => {
  try {
    const { projectId } = req.params;
    const { description, status, due_date } = req.body;

    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({
        status: false,
        message: 'Project not found',
      });
    }

    const task = await Task.create({
      description,
      status: status || 'To Do',
      due_date,
      project_id: projectId,
    });

    return res.status(201).json({
      status: true,
      data: task.toJSON(),
      message: 'Task created',
    });
  } catch (err: unknown) {
    logger(err as Error);

    return res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Something went wrong',
    });
  }
};

export default createTask;
