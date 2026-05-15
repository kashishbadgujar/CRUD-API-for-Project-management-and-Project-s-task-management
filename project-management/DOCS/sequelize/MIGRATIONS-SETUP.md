# migration setup

## Create migration

```shell
yarn nx run project-management:migration:generate --name <migration-name>

## e.g.
yarn nx run project-management:migration:generate --name create-user
```

This will create file `apps/project-management/src/migrations/<timestamp>-<migration-name>.js` with following content.

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
```

## Update the migration file to `.ts`

> Rename the above created file and update the extension from `.js` to `.ts`

```md
`apps/project-management/src/migrations/<timestamp>-<migration-name>.js` becomes
`apps/project-management/src/migrations/<timestamp>-<migration-name>.ts`
```

> Update the content as below

```typescript
import { QueryInterface, DataTypes, Sequelize } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface: QueryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
```

## Add columns to the table

Update the newly created `.ts` file as shown below to add columns in up and down migration blocks

```typescript
import { QueryInterface, DataTypes } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('users');
  },
};

```

You can add as many columns you need and complete the migration.

## Apply migration

```shell
yarn nx run project-management:migration:apply
```

## Rollback/Undo migrations

```shell
yarn nx run project-management:migration:rollback
```
