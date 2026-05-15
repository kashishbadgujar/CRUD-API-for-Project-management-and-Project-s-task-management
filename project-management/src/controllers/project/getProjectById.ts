import { Request, Response } from 'express';
import { models } from '../../models';
import logger from '../../utils/helpers/logger';
import { ApiResponse, ProjectWithTasksType } from '../../utils/types';

const { Project } = models;

type GetProjectByIdParamsType = {
  projectId: string;
};

/**
 * @description Fetch a single project by ID along with associated tasks.
 *
 * @route GET /api/projects/:projectId
 *
 * @param {Request<GetProjectByIdParamsType>} req - Express request object containing projectId
 * @param {Response<ApiResponse<ProjectWithTasksType>>} res - Express response object
 *
 * @returns {Promise<Response>} Returns project details with tasks
 *
 * @throws {404} If project is not found
 * @throws {500} If fetching project fails
 */
const getProjectById = async (
  req: Request<GetProjectByIdParamsType>,
  res: Response<ApiResponse<ProjectWithTasksType>>,
) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findByPk(projectId, {
      include: ['tasks'],
    });

    if (!project) {
      return res.status(404).json({
        status: false,
        message: 'Project not found',
      });
    }

    return res.status(200).json({
      status: true,
      data: project.toJSON(),
      message: 'Project fetched',
    });
  } catch (err: unknown) {
    logger(err as Error);

    return res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Error fetching project',
    });
  }
};

export default getProjectById;
