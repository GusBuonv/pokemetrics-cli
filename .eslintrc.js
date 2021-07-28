module.exports = {
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-empty-interface': 0,
    'no-shadow': 'off',
    'consistent-return': 'off',
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2, {
      ignoredNodes: ['TSTypeParameterInstantiation'],
      SwitchCase: 1,
    }],
    '@typescript-eslint/no-shadow': ['error'],
    'object-curly-newline': ['error', { ImportDeclaration: 'never' }],
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
  },
};
