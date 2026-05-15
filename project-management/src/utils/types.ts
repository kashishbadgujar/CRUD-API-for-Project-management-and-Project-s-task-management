import { Optional } from 'sequelize';

/**
 * @description Standard API response format
 */
export interface ApiResponse<T = unknown> {
  status: boolean;
  message: string;
  data?: T;
}

/**
 * @description Project entity attributes stored in database
 */
export interface ProjectAttributes {
  id: string;
  name: string;
  description: string | null;
  start_date: Date | null;
  end_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

/**
 * @description Attributes required while creating a project
 */
export type ProjectCreationAttributesType = Optional<
  ProjectAttributes,
  'id' | 'created_at' | 'updated_at'
>;

/**
 * @description Allowed task status values used across the application.
 */
export const validTaskStatuses = ['To Do', 'In Progress', 'Completed'] as const;

/**
 * @description Type representing valid task status values.
 */
export type TaskStatusType = (typeof validTaskStatuses)[number];

/**
 * @description Defines the attributes of a task entity stored in the database,
 * including task description, status, associated project_id,
 * due date, and creation and update timestamps.
 */
export interface TaskAttributes {
  id: string;
  description: string;
  status: TaskStatusType;
  project_id: string;
  due_date: Date;
  created_at: Date;
  updated_at: Date;
}

/**
 * @description Attributes required while creating a task
 */
export type TaskCreationAttributesType = Optional<
  TaskAttributes,
  'id' | 'project_id' | 'due_date' | 'created_at' | 'updated_at'
>;

/**
 * @description Request body for creating a task.
 */
export type TaskRequestBodyType = Pick<TaskAttributes, 'description' | 'status' | 'due_date'>;

/**
 * @description Request body for updating a task.
 * All fields are optional for partial updates.
 */
export type UpdateTaskBodyType = Partial<TaskRequestBodyType>;

/**
 * @description Project response type including associated tasks.
 */
export type ProjectWithTasksType = ProjectAttributes & {
  tasks: TaskAttributes[];
};

/**
 * @description Task response type including associated project details.
 */
export type TaskWithProjectType = TaskAttributes & {
  project: Pick<ProjectAttributes, 'id' | 'name'>;
};
