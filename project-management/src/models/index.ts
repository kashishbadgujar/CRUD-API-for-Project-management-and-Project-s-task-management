import { Sequelize } from 'sequelize';
import ProjectModel from './project';
import TaskModel from './task';

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
);

const models = {
  Project: ProjectModel(sequelize),
  Task: TaskModel(sequelize),
};

/**
 * @description Define associations between Project and Task models
 */
models.Project.hasMany(models.Task, {
  foreignKey: 'project_id',
  as: 'tasks',
});

models.Task.belongsTo(models.Project, {
  foreignKey: 'project_id',
  as: 'project',
});

export { sequelize, models };
