import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Globales del navegador
        ...globals.node,    // Globales de Node.js
        Object: "readonly", // Define Object como global de solo lectura
      },
    },
  },
  pluginJs.configs.recommended,
];