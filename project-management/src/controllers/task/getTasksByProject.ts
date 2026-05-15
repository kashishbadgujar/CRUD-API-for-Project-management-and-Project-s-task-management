import { Request, Response } from 'express';
import { models } from '../../models';
import logger from '../../utils/helpers/logger';
import { ApiResponse, TaskAttributes } from '../../utils/types';

const { Task, Project } = models;

type GetTasksByProjectParamsType = {
  projectId: string;
};

/**
 * @description Fetches all tasks for a specific project.
 *
 * @route GET /api/projects/:projectId/tasks
 *
 * @param {Request<GetTasksByProjectParamsType>} req - Express request object containing projectId in params
 * @param {Response<ApiResponse<TaskAttributes[]>>} res - Express response object
 *
 * @returns {Promise<Response>} Returns list of tasks for the project
 *
 * @throws {404} If project is not found
 * @throws {500} If fetching tasks fails
 */
const getTasksByProject = async (
  req: Request<GetTasksByProjectParamsType>,
  res: Response<ApiResponse<TaskAttributes[]>>,
) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({
        status: false,
        message: 'Project not found',
      });
    }

    const tasks = await Task.findAll({
      where: { project_id: projectId },
      raw: true,
    });

    return res.status(200).json({
      status: true,
      data: tasks,
      message: 'Tasks fetched',
    });
  } catch (err: unknown) {
    logger(err as Error);

    return res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Error fetching tasks',
    });
  }
};

export default getTasksByProject;
