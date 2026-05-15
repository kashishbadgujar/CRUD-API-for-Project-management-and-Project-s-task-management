import { Request, Response } from 'express';
import { models } from '../../models';
import logger from '../../utils/helpers/logger';
import { ApiResponse } from '../../utils/types';

const { Task } = models;

type DeleteTaskDataType = {
  taskId: string;
};

/**
 * @description Deletes a task by its taskId.
 *
 * @route DELETE /api/tasks/:taskId
 *
 * @param {Request<DeleteTaskDataType>} req - Express request object containing taskId in params
 * @param {Response<ApiResponse<DeleteTaskDataType>>} res - Express response object
 *
 * @returns {Promise<Response>} Returns deleted taskId with success message
 *
 * @throws {404} Returns error if task is not found
 * @throws {500} Returns error message if deletion fails
 */
const deleteTask = async (
  req: Request<DeleteTaskDataType>,
  res: Response<ApiResponse<DeleteTaskDataType>>,
) => {
  try {
    const { taskId } = req.params;

    const deletedCount = await Task.destroy({
      where: { id: taskId },
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      status: true,
      data: { taskId },
      message: 'Task deleted',
    });
  } catch (err: unknown) {
    logger(err as Error);

    return res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Error deleting task',
    });
  }
};

export default deleteTask;
