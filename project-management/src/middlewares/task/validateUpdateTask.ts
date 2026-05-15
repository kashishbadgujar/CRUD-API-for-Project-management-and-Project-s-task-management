import { Request, Response, NextFunction } from 'express';
import { UpdateTaskBodyType, validTaskStatuses } from '../../utils/types';

/**
 * @description Validates update task request body.
 * Ensures that provided fields are valid.
 *
 * @param {Request<unknown, unknown, UpdateTaskBodyType>} req - Express request object containing update data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 *
 * @returns {void | Response} Proceeds to next middleware if valid, else returns error response
 */
const validateUpdateTask = (
  req: Request<unknown, unknown, UpdateTaskBodyType>,
  res: Response,
  next: NextFunction,
) => {
  const { description, status, due_date } = req.body;

  if (description && typeof description !== 'string') {
    return res.status(400).json({
      status: false,
      message: 'Invalid description',
    });
  }

  if (status && !validTaskStatuses.includes(status)) {
    return res.status(400).json({
      status: false,
      message: 'Invalid status value',
    });
  }

  if (due_date && isNaN(new Date(due_date).getTime())) {
    return res.status(400).json({
      status: false,
      message: 'Invalid due_date format',
    });
  }

  next();
};

export default validateUpdateTask;
