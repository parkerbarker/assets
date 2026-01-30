import globals from "globals";

export default [
  {
    files: ["js/**/*.js"],
    ignores: ["**/*.min.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.browser,
      }
    },
    rules: {
      // Errors
      "no-undef": "error",
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty": "error",
      "no-unreachable": "error",
      
      // Warnings
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "no-debugger": "warn",
      "prefer-const": "warn",
      "eqeqeq": ["warn", "smart"],
      
      // Style (auto-fixable)
      "semi": ["error", "always"],
      "quotes": ["warn", "single", { "avoidEscape": true }],
      "indent": ["warn", 2, { "SwitchCase": 1 }],
      "comma-dangle": ["warn", "only-multiline"],
      "no-trailing-spaces": "warn",
      "no-multiple-empty-lines": ["warn", { "max": 2 }],
    }
  }
];
