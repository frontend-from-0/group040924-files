import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Home Page', () => {
  test(('should display featured products'), async ({ page }) => {
    const pageTitle = page.locator('h2');

    await expect(pageTitle).toHaveText('Featured Products');

    const productTitles = page.locator('h3');

    console.log('productTitles', await productTitles.count());

    expect(await productTitles.count()).toBe(10);
  });
});