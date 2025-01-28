import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Nest.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    env: {
      node: true
    }
  }
];
