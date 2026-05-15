import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('tasks', 'due_date', {
      type: DataTypes.DATEONLY,
      allowNull: false,
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('tasks', 'due_date');
  },
};
