import { Request, Response } from 'express';
import { models } from '../../models';
import logger from '../../utils/helpers/logger';
import { ApiResponse, ProjectAttributes } from '../../utils/types';

const { Project } = models;

type CreateProjectBodyType = {
  name: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
};

/**
 * @description Creates a new project with the provided details.
 *
 * @param {Request<unknown, unknown, CreateProjectBodyType>} req - Express request object containing project data in body
 * @param {Response<ApiResponse<ProjectAttributes>>} res - Express response object used to send response
 *
 * @returns {Promise<Response>} Returns a JSON response with created project data and success message
 *
 * @throws {500} Returns error message if project creation fails
 */
const createProject = async (
  req: Request<unknown, unknown, CreateProjectBodyType>,
  res: Response<ApiResponse<ProjectAttributes>>,
) => {
  try {
    const { name, description, start_date, end_date } = req.body;

    const project = await Project.create({
      name,
      description,
      start_date,
      end_date,
    });

    return res.status(201).json({
      status: true,
      data: project.toJSON(),
      message: 'Project created',
    });
  } catch (err: unknown) {
    logger(err as Error);

    return res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Something went wrong',
    });
  }
};

export default createProject;
