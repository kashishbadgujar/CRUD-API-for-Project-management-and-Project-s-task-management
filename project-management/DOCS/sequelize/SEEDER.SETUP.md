# seeder setup

## Create seeder

```shell
yarn nx run project-management:seed:generate --name <seed-name>

## e.g.
yarn nx run project-management:seed:generate --name demo-user
```

This will create file `apps/project-management/src/seeders/<timestamp>-<seed-name>.js` with following content.

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
```

## Update the migration file to `.ts`

> Rename the above created file and update the extension from `.js` to `.ts`

```md
`apps/project-management/src/seeders/<timestamp>-<migration-name>.js` becomes
`apps/project-management/src/seeders/<timestamp>-<migration-name>.ts`
```

> Update the content as below

```typescript
import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface: QueryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
```

## Add data to the table

Update the newly created `.ts` file as shown below to add data in up and down migration blocks in table

```typescript
import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        id: '7db7436b-f14d-4df5-baee-b5a106eddddf',
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('users', {});
  },
};
```

## Apply seeds

```shell
yarn nx run project-management:seed:apply
```

## Rollback/Undo seeds

```shell
yarn nx run project-management:seed:rollback
```
