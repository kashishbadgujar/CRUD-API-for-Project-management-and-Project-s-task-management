import { Request, Response, NextFunction } from 'express';
import { TaskRequestBodyType, validTaskStatuses } from '../../utils/types';
import isValidDate from '../../utils/helpers/isValidDate';

/**
 * @description Validates create task request body.
 * Ensures description and due_date are provided and valid.
 *
 * @param {Request<unknown, unknown, TaskRequestBodyType>} req - Express request object containing task data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 *
 * @returns {void | Response} Proceeds to next middleware if valid, else returns error response
 */
const validateCreateTask = (
  req: Request<unknown, unknown, TaskRequestBodyType>,
  res: Response,
  next: NextFunction,
) => {
  const { description, status, due_date } = req.body;

  if (!description || typeof description !== 'string') {
    return res.status(400).json({
      status: false,
      message: 'Valid description is required',
    });
  }

  if (!status || !validTaskStatuses.includes(status)) {
    return res.status(400).json({
      status: false,
      message: 'Valid status is required',
    });
  }

  if (!due_date || !isValidDate(due_date)) {
    return res.status(400).json({
      status: false,
      message: 'Valid due_date is required',
    });
  }

  next();
};

export default validateCreateTask;
