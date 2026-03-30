import { test, expect } from '@playwright/test';

test('E2e Place order success', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  const username = 'standard_user';
  const passoword = 'secret_sauce';

  //Case Login
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(passoword);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toMatchAriaSnapshot(`- text: Products`);

  const title_page = (await page.locator('[data-test="title"]').textContent())?.trim() ?? '';
  console.log('Access first page :', title_page)

  //Case Select products

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  const product1 = (await page.locator('[data-test="item-4-title-link"]').textContent())?.trim() ?? '';
  console.log('get text1:', product1);

  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  const product2 = (await page.locator('[data-test="item-0-title-link"]').textContent())?.trim() ?? '';
  console.log('get text2:', product2);

  //Get Price page list product
  const priceLocators = page.locator('[data-test="inventory-item-price"]');

  const firstPriceText = (await priceLocators.nth(0).textContent())?.trim() ?? '';
  const secondPriceText = (await priceLocators.nth(1).textContent())?.trim() ?? '';

  const firstPrice = parseFloat(firstPriceText.replace(/[^0-9.]/g, ''));
  const secondPrice = parseFloat(secondPriceText.replace(/[^0-9.]/g, ''));

  const sumPrice = firstPrice + secondPrice;

  console.log('First price text:', firstPriceText);  
  console.log('Second price text:', secondPriceText); 
  console.log('First price int:', firstPrice);        
  console.log('Second price int:', secondPrice);     
  console.log('Sum price:', sumPrice);   

  await expect(page.locator('[data-test="shopping-cart-link"]')).toMatchAriaSnapshot(`- text: "2"`);

  //Case Review cart

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page.locator('[data-test="item-4-title-link"] [data-test="inventory-item-name"]')).toContainText(product1);
  await expect(page.locator('[data-test="cart-list"]')).toContainText(firstPriceText);

  await expect(page.locator('[data-test="item-0-title-link"] [data-test="inventory-item-name"]')).toContainText(product2);
  await expect(page.locator('[data-test="cart-list"]')).toContainText(secondPriceText);


  await page.locator('[data-test="checkout"]').click();

  //Case Check out
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Saran');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('tester');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('16120');

  await page.locator('[data-test="continue"]').click();

  //Case verify pricing

  const itemTotalText =
    (await page.locator('[data-test="subtotal-label"]').textContent())?.trim() ?? '';
  const taxText =
    (await page.locator('[data-test="tax-label"]').textContent())?.trim() ?? '';
  const totalText =
    (await page.locator('[data-test="total-label"]').textContent())?.trim() ?? '';

  const actualItemTotal = parseFloat(itemTotalText.replace(/[^0-9.]/g, ''));

  const actualTax = parseFloat(taxText.replace(/[^0-9.]/g, ''));
  const actualTotal = parseFloat(totalText.replace(/[^0-9.]/g, ''));

  expect(actualItemTotal).toBe(sumPrice);
  expect(actualTotal).toBeCloseTo(actualItemTotal + actualTax, 2);
  console.log('actualItemTotal:', actualItemTotal);  
  console.log('actualTotal:', actualTotal);

  await page.locator('[data-test="finish"]').click();

  //Case Complete order

  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!'); //Check access page complete
  await page.locator('[data-test="back-to-products"]').click();

  //Case Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  await expect(page.locator('#root')).toContainText('Swag Labs'); //Check logout success and go to page login

  //End Process
  
});
