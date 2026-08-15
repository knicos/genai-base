/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import { extname, relative, resolve } from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

// https://vitejs.dev/config/
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname =
    typeof import.meta.dirname !== 'undefined' ? import.meta.dirname : path.dirname(fileURLToPath(import.meta.url));

const isCI = !!process.env.CI || !!process.env.DISABLE_STORYBOOK_PLAYWRIGHT;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const projects: any[] = [
    {
        extends: true,
        test: {
            environment: 'jsdom',
            setupFiles: './src/setupTests.ts',
            clearMocks: true,
        },
    },
];

if (!isCI) {
    projects.push({
        extends: true,
        plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
                configDir: path.join(dirname, '.storybook'),
            }),
        ],
        test: {
            name: 'storybook',
            browser: {
                enabled: true,
                headless: true,
                provider: playwright({}),
                instances: [
                    {
                        browser: 'chromium',
                    },
                ],
            },
        },
    });
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
    plugins: [
        react(),
        libInjectCss(),
        dts({
            tsconfigPath: './tsconfig.build.json',
            include: ['lib'],
            rollupTypes: false,
            beforeWriteFile: (filePath, content) => ({
                filePath: filePath.replace('lib/', ''),
                content,
            }),
        }),
    ],
    resolve: {
        alias: {
            '@public': resolve(import.meta.dirname, './public'),
            '@base': resolve(import.meta.dirname, './lib'),
        },
    },
    build: {
        copyPublicDir: true,
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                '@mui/material',
                '@mui/icons-material',
                '@emotion/react',
                '@emotion/styled',
                'react-i18next',
                '@mui/x-charts',
                'react-router-dom',
                'react-router',
            ],
            output: {
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: '[name].js',
            },
            input: Object.fromEntries(
                glob
                    .sync('lib/**/*.{ts,tsx}', {
                        ignore: ['lib/**/*.d.ts', 'lib/**/*.test.ts', 'lib/**/*.test.tsx'],
                    })
                    .map((file) => [
                        // The name of the entry point
                        // lib/nested/foo.ts becomes nested/foo
                        relative('lib', file.slice(0, file.length - extname(file).length)),
                        // The absolute path to the entry file
                        // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
                        fileURLToPath(new URL(file, import.meta.url)),
                    ])
            ),
        },
        lib: {
            entry: resolve(import.meta.dirname, 'lib/main.tsx'),
            formats: ['es'],
        },
    },
    test: {
        coverage: {
            provider: 'v8',
            reporter: ['cobertura', 'html'],
            include: ['lib/**/*.{ts,tsx}'],
        },
        projects,
    },
});
