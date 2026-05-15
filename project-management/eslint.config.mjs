import baseConfig from '../../eslint.config.mjs';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: ['**/config/config.js'],
    languageOptions: {
      parserOptions: {
        project: ['apps/project-management/tsconfig.*?.json'],
      },
    },
  },
];
