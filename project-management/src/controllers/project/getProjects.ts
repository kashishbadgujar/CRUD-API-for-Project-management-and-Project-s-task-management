import { Request, Response } from 'express';
import { models } from '../../models';
import logger from '../../utils/helpers/logger';
import { ApiResponse, ProjectAttributes } from '../../utils/types';

const { Project } = models;

/**
 * @description Fetches all projects from the database.
 *
 * @route GET /api/projects
 *
 * @param {Request} req - Express request object (not used in this handler)
 * @param {Response<ApiResponse<ProjectAttributes[]>>} res - Express response object
 *
 * @returns {Promise<Response>} Returns list of all projects with success message
 *
 * @throws {500} Returns error response if fetching projects fails
 */
const getProjects = async (req: Request, res: Response<ApiResponse<ProjectAttributes[]>>) => {
  try {
    const projects = await Project.findAll({ raw: true });

    return res.status(200).json({
      status: true,
      data: projects,
      message: 'Projects fetched',
    });
  } catch (err: unknown) {
    logger(err as Error);

    return res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Error fetching projects',
    });
  }
};

export default getProjects;
