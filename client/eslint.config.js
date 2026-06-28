//  @ts-check
import { tanstackConfig } from "@tanstack/eslint-config";

export default [
    ...tanstackConfig,
    {
        rules: {
            "import/no-cycle": "off",
            "import/order": "off",
            "import/no-duplicates": "off",
            "sort-imports": "off",
            "@typescript-eslint/array-type": "off",
            "@typescript-eslint/require-await": "off",
            "pnpm/json-enforce-catalog": "off",
        },
    },
    {
        ignores: ["eslint.config.js", ".prettierrc", "node_modules", "dist"],
    },
    {
        files: ["src/components/ui/**.tsx"],
        rules: {
            "react-refresh/only-export-components": "off",
            "import/consistent-type-specifier-style": "off",
        },
    },
];
