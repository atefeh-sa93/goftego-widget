import { expect, test } from '@playwright/test';

test('plain demo page loads', async ({ page }) => {
  await page.goto('/plain/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Plain HTML host');
});
