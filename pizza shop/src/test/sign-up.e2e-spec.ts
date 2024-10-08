import { expect, test } from '@playwright/test'

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do negócio').fill('Pizza Shop')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('email@mail.com')
  await page.getByLabel('Celular').fill('4799928273')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado!')

  expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Login' }).click()

  expect(page.url()).toContain('/sign-in?email=email@mail.com')
})

test('sign up with error', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  await page.getByLabel('Nome do negócio').fill('Invalid name')
  await page.getByLabel('Seu nome').fill('John Doe')
  await page.getByLabel('Seu e-mail').fill('wrong-email@mail.com')
  await page.getByLabel('Celular').fill('4799928273')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Erro ao registrar restaurante!')

  expect(toast).toBeVisible()
})