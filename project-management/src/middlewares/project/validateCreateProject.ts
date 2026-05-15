import { Request, Response, NextFunction } from 'express';

type CreateProjectBody = {
  name?: string;
};

/**
 * @description Validates create project request body.
 * Ensures project name is provided and not purely numeric.
 *
 * @param {Request<unknown, unknown, CreateProjectBody>} req - Express request object containing project data
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 *
 * @returns {void | Response} Proceeds to next middleware if valid, else returns error response
 */
const validateCreateProject = (
  req: Request<unknown, unknown, CreateProjectBody>,
  res: Response,
  next: NextFunction,
) => {
  const { name } = req.body;

  if (!name || /^[0-9]+$/.test(name)) {
    return res.status(400).json({
      status: false,
      message: 'Invalid project name',
    });
  }

  next();
};

export default validateCreateProject;
