import { Request, Response } from 'express';
import { models } from '../../models';
import logger from '../../utils/helpers/logger';
import { ApiResponse, TaskAttributes, UpdateTaskBodyType } from '../../utils/types';

const { Task } = models;

type UpdateTaskParamsType = {
  taskId: string;
};

/**
 * @description Updates an existing task by taskId.
 * Only the fields provided in the request body will be updated.
 *
 * @route PUT /api/tasks/:taskId
 *
 * @param {Request<UpdateTaskParamsType, unknown, UpdateTaskBodyType>} req - Express request object containing taskId in params and update fields in body
 * @param {Response<ApiResponse<TaskAttributes>>} res - Express response object
 *
 * @returns {Promise<Response>} Returns updated task data with success message
 *
 * @throws {404} If task not found
 * @throws {500} If update operation fails
 */
const updateTask = async (
  req: Request<UpdateTaskParamsType, unknown, UpdateTaskBodyType>,
  res: Response<ApiResponse<TaskAttributes>>,
) => {
  try {
    const { taskId } = req.params;

    /**
     * Build update payload only with provided fields
     */
    const taskUpdateFields: UpdateTaskBodyType = {};

    if (req.body.description !== undefined) {
      taskUpdateFields.description = req.body.description;
    }

    if (req.body.status !== undefined) {
      taskUpdateFields.status = req.body.status;
    }

    if (req.body.due_date !== undefined) {
      taskUpdateFields.due_date = req.body.due_date;
    }

    const [affectedRows, updatedRows] = await Task.update(taskUpdateFields, {
      where: { id: taskId },
      returning: true,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Task not found',
      });
    }

    return res.status(200).json({
      status: true,
      data: updatedRows[0].toJSON(),
      message: 'Task updated',
    });
  } catch (err: unknown) {
    logger(err as Error);

    return res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Error updating task',
    });
  }
};

export default updateTask;
