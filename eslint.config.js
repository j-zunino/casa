import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
    { ignores: ['**/dist', '**/node_modules'] },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
        },
    },

    {
        files: ['client/**/*.{ts,tsx}'],
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...reactRefresh.configs.vite.rules,
        },
        languageOptions: { globals: globals.browser },
    },

    {
        files: ['server/**/*.ts'],
        languageOptions: { globals: globals.node },
    },
];
