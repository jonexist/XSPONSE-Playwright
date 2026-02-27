import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    testMatch: 'All.spec.ts',
    fullyParallel: false,
    workers: 1,
    use: {
        ...devices['Desktop Chrome'],
        headless: false,
        screenshot: 'on',
        trace: 'on',
    },
});
