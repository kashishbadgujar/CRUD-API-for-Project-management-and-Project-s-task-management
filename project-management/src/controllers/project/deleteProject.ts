import { Request, Response } from 'express';
import { models } from '../../models';
import logger from '../../utils/helpers/logger';
import { ApiResponse } from '../../utils/types';

const { Project } = models;

type DeleteProjectDataType = {
  projectId: string;
};

/**
 * @description Deletes a project by its projectId.
 *
 * @route DELETE /api/projects/:projectId
 *
 * @param {Request<DeleteProjectDataType>} req - Express request object containing projectId in params
 * @param {Response<ApiResponse<DeleteProjectDataType>>} res - Express response object
 *
 * @returns {Promise<Response>} Returns deleted projectId with success message
 *
 * @throws {404} Returns error if project is not found
 * @throws {500} Returns error message if deletion fails
 */
const deleteProject = async (
  req: Request<DeleteProjectDataType>,
  res: Response<ApiResponse<DeleteProjectDataType>>,
) => {
  try {
    const { projectId } = req.params;

    const deletedCount = await Project.destroy({
      where: { id: projectId },
    });

    if (deletedCount === 0) {
      return res.status(404).json({
        status: false,
        message: 'Project not found',
      });
    }

    return res.status(200).json({
      status: true,
      data: { projectId },
      message: 'Project deleted',
    });
  } catch (err: unknown) {
    logger(err as Error);

    return res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Error deleting project',
    });
  }
};

export default deleteProject;
