import structuredClone from 'structured-clone';

if (typeof globalThis.structuredClone === 'undefined') {
  globalThis.structuredClone = structuredClone;
}

export default [
  {
    files: ['**/*.js', '**/*.mjs'],
    ignores: ['coverage/**', 'server.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'off', // Suppress unused variable warnings
      'no-console': 'off', // Allow console statements
      // Add your custom rules here
    },
  },
];