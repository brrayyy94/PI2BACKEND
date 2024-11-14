export default [
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: 'airbnb-base',
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          mjs: 'always',
        },
      ],
    },
  },
];