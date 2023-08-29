import { test, expect } from '@playwright/test';
import { TEST_EMAIL, createTestUser, deleteTestUser } from './utils';

const tests = () => {
    test('search user', async ({ page }) => {
        await createTestUser();
        await page.goto(`${process.env.BASE_URL}/admin/user`);
        await page.fill('input[name="search"]', TEST_EMAIL);
        await page.waitForTimeout(300);
        await page.waitForResponse(`${process.env.BASE_URL}/_next/data/**`);
        const table = await page.$('table');
        const tbody = await table?.$('tbody');
        const rows = await tbody?.$$('tr');
        const oneRow = rows?.length === 1;
        await deleteTestUser();
        expect(oneRow).toBeTruthy();
    });
}

export default tests;
