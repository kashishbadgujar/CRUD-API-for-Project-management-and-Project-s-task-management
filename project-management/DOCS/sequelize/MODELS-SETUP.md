# models setup

## Create model

```shell
yarn nx run project-management:model:generate --name <model-name> --attributes <field1>:<type>,<field2>:<type>

## e.g.
yarn nx run project-management:model:generate --name User --attributes id:uuid
```

This will create file `apps/project-management/src/models/<model-name>.js` with following content.

> File name will be in lowercase. As if you pass model name as `User` the file name will be `user.js`

```javascript
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
```

## Update the model file to `.ts`

> Rename the above created file and update the extension from `.js` to `.ts`

```md
`apps/project-management/src/models/<model-name>.js` becomes
`apps/project-management/src/models/<model-name>.ts`
```

> Update the content as shown below

```typescript
import { Model, Sequelize, DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  User.init(
    {
      id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
```

You can add as many columns as you want afterwards to complete your model
