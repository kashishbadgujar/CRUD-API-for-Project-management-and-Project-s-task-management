import { Model, Sequelize, DataTypes, ModelAttributes } from 'sequelize';
import { TaskAttributes, TaskCreationAttributesType } from '../utils/types';

export default (sequelize: Sequelize) => {
  class Task extends Model<TaskAttributes, TaskCreationAttributesType> implements TaskAttributes {
    public id!: string;
    public description!: string;
    public status!: 'To Do' | 'In Progress' | 'Completed';
    public project_id!: string;
    public due_date!: Date;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
  }

  const taskAttributes: ModelAttributes<Task, TaskAttributes> = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('To Do', 'In Progress', 'Completed'),
      allowNull: false,
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  };

  Task.init(taskAttributes, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Task;
};
