import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/user/signup');
});

test.describe('Sign Up Page', () => {
  test('should display sign up form with correct input labels and warning', async ({
    page,
  }) => {
    await page.getByRole('heading', { name: 'Sign Up' }).click();
    expect(await page.getByText('Email')).toBeVisible();
    expect(await page.getByText('Password')).toBeVisible();
    expect(await page.getByText('Minimum 6 characters')).toBeVisible();
    expect(await page.getByText('Create Account')).toBeVisible();
  });

  test('should sign up a new user', async ({ page }) => {
    const randomNumber = Date.now();

    const randomEmail = `test-${randomNumber}@gmail.com`;
    await page.getByRole('textbox', { name: 'Email' }).fill(randomEmail);
    await page.getByRole('textbox', { name: 'Password' }).fill('123qwe');

    await page.getByRole('button', { name: 'Create Account' }).click();

    await expect(page).toHaveURL('/');
    expect(await page.getByText('Featured Products')).toBeVisible({
      timeout: 10_000,
    });
    expect(await page.getByText(`Hello, ${randomEmail}`)).toBeVisible();
  });

  test('should not allow to create new accounts with the same email', async ({
    page,
  }) => {
    const randomNumber = Date.now();
    const randomEmail = `test-${randomNumber}@gmail.com`;

    await page.getByRole('textbox', { name: 'Email' }).fill(randomEmail);
    await page.getByRole('textbox', { name: 'Password' }).fill('123qwe');
    await page.getByRole('button', { name: 'Create Account' }).click();

    await page.goto('/user/signup');
    await page.getByRole('textbox', { name: 'Email' }).fill(randomEmail);
    await page.getByRole('textbox', { name: 'Password' }).fill('123qwe');
    await page.getByRole('button', { name: 'Create Account' }).click();

    // TODO:  Anna - fix this test - it should check for the error message in the form
    expect(await page.getByTestId('form-error')).toBeVisible();
  });
});
