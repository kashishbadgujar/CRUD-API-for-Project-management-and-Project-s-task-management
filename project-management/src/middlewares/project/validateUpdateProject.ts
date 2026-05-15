import { Request, Response, NextFunction } from 'express';

type UpdateProjectBody = {
  name?: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
};

/**
 * @description Validates update project request body.
 * Ensures that if name is provided, it should not be purely numeric.
 *
 * @param {Request<unknown, unknown, UpdateProjectBody>} req - Express request object containing update data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 *
 * @returns {void | Response} Proceeds to next middleware if valid, else returns error response
 */
const validateUpdateProject = (
  req: Request<unknown, unknown, UpdateProjectBody>,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.body;

  if (name && /^[0-9]+$/.test(name)) {
    return res.status(400).json({
      status: false,
      message: 'Invalid project name',
    });
  }

  next();
};

export default validateUpdateProject;
