import { QueryInterface } from 'sequelize';

const demoProjectOne = '7db7436b-f14d-4df5-baee-b5a106eddddf';
const demoProjectTwo = '5110c15a-aafc-4048-b82b-d3b9fc2e11e4';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('projects', [
      {
        id: demoProjectOne,
        name: 'Project Alpha',
        description: 'First project',
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: demoProjectTwo,
        name: 'Project Beta',
        description: 'Second project',
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'd0e21a16-7b1c-4518-92c5-1902f199651f',
        name: 'Project Gamma',
        description: 'Third project',
        start_date: new Date(),
        end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('tasks', [
      {
        id: '76cd56af-27a9-4bde-80b7-1d662f2cad33',
        description: 'Design UI',
        status: 'To Do',
        project_id: demoProjectOne,
        due_date: new Date('2026-05-16'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '88540713-8ee6-4ab4-ba32-699ad2a862e1',
        description: 'Setup Backend',
        status: 'In Progress',
        project_id: demoProjectOne,
        due_date: new Date('2026-05-19'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '7247ad63-669f-46b9-aa66-7eaace660892',
        description: 'Modify Database',
        status: 'To Do',
        project_id: demoProjectTwo,
        due_date: new Date('2026-05-21'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'c7216cd5-ed55-41f8-a24a-4a403cbdf71e',
        description: 'API Integration',
        status: 'Completed',
        project_id: demoProjectTwo,
        due_date: new Date('2026-05-26'),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('tasks', {});
    await queryInterface.bulkDelete('projects', {});
  },
};
