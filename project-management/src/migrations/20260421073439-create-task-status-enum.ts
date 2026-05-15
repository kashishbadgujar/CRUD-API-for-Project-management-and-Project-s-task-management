import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_task_status" AS ENUM (
        'To Do',
        'In Progress',
        'Completed'
      );
    `);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.sequelize.query(`
      DROP TYPE IF EXISTS "enum_task_status";
    `);
  },
};
