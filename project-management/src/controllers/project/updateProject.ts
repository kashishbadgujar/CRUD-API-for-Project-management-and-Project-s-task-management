import { Request, Response } from 'express';
import { models } from '../../models';
import logger from '../../utils/helpers/logger';
import { ApiResponse, ProjectAttributes } from '../../utils/types';

const { Project } = models;

type UpdateProjectParamsType = {
  projectId: string;
};

type UpdateProjectBodyType = {
  name?: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
};

/**
 * @description Updates an existing project by projectId.
 * Only the fields provided in the request body will be updated.
 *
 * @param {Request<UpdateProjectParamsType, unknown, UpdateProjectBodyType>} req - Express request object containing projectId in params and updated fields in body
 * @param {Response<ApiResponse<ProjectAttributes>>} res - Express response object used to send response
 *
 * @returns {Promise<Response<ApiResponse<ProjectAttributes>>>} Returns updated project data with success message
 *
 * @throws {404} Returns error if project is not found
 * @throws {500} Returns error message if update operation fails
 */
const updateProject = async (
  req: Request<UpdateProjectParamsType, unknown, UpdateProjectBodyType>,
  res: Response<ApiResponse<ProjectAttributes>>,
) => {
  try {
    const { projectId } = req.params;

    /**
     * Builds update payload by including only fields that are explicitly provided in the request body.
     * Prevents overwriting existing values with undefined.
     */
    const updateData: Partial<UpdateProjectBodyType> = {};

    if (req.body.name !== undefined) {
      updateData.name = req.body.name;
    }

    if (req.body.description !== undefined) {
      updateData.description = req.body.description;
    }

    if (req.body.start_date !== undefined) {
      updateData.start_date = req.body.start_date;
    }

    if (req.body.end_date !== undefined) {
      updateData.end_date = req.body.end_date;
    }

    const [affectedRows, updatedRows] = await Project.update(updateData, {
      where: { id: projectId },
      returning: true,
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: 'Project not found',
      });
    }

    return res.status(200).json({
      status: true,
      data: updatedRows[0].toJSON(),
      message: 'Project updated',
    });
  } catch (err: unknown) {
    logger(err as Error);

    return res.status(500).json({
      status: false,
      message: err instanceof Error ? err.message : 'Error updating project',
    });
  }
};

export default updateProject;
