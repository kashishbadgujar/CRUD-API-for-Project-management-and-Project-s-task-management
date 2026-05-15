import { Model, Sequelize, DataTypes, ModelAttributes } from 'sequelize';
import { ProjectAttributes, ProjectCreationAttributesType } from '../utils/types';

export default (sequelize: Sequelize) => {
  class Project
    extends Model<ProjectAttributes, ProjectCreationAttributesType>
    implements ProjectAttributes
  {
    public id!: string;
    public name!: string;
    public description!: string | null;
    public start_date!: Date | null;
    public end_date!: Date | null;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
  }

  const projectAttributes: ModelAttributes<Project, ProjectAttributes> = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  };

  Project.init(projectAttributes, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Project;
};
