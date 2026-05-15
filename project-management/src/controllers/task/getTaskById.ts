import { Request, Response } from 'express';
import { models } from '../../models';
import logger from '../../utils/helpers/logger';
import { ApiResponse, TaskWithProjectType } from '../../utils/types';

const { Task } = models;

type GetTaskByIdParamsType = {
  taskId: string;
};

/**
 * @description Fetch a single task by ID along with project details.
 *
 * @route GET /api/tasks/:taskId
 *
 * @param {Request<GetTaskByIdParamsType>} req - Express request object containing taskId
 * @param {Response<ApiResponse<TaskWithProjectType>>} res - Express response object
 *
 * @returns {Promise<Response>} Returns task details with project info
 *
 * @throws {404} If task is not found
 * @throws {500} If fetching task fails
 */
const getTaskById = async (
  req: Request<GetTaskByIdParamsType>,
  res: Response<ApiResponse<TaskWithProjectType>>,
) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId, {
      include: [{ association: 'project', attributes: ['id', 'name'] }],
    });

    if (!task) {
      return res.status(404).json({
        status: false,
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      status: true,
      data: task.toJSON(),
      message: 'Task fetched',
    });
  } catch (err: unknown) {
    logger(err as Error);

    return res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Error fetching task',
    });
  }
};

export default getTaskById;
