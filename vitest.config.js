import { defineConfig } from "vite";

export default defineConfig ({
    test: {
        include: ['./test/testing-library/**/*.jsx', './test/testing-library/**/*.js'],
        environment: 'jsdom',
        setupFiles: './test/testing-library/vitest-setup.js',
        passWithNoTests: true,
        reporters: ['default', 'junit'],
        outputFile: './reports/testing-library.xml'
    }
})