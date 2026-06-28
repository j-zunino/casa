//  @ts-check
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: ["dist/**", "node_modules/**"],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                sourceType: "module",
            },
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": "error",

            "no-console": "warn",
            "no-debugger": "error",
            "prefer-const": "error",

            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_|req|res|next" },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
        },
    },

    prettierConfig,
);
