# Automated Login Test – README

## Overview

This project contains an automated UI test for the login functionality using **Playwright with TypeScript**.

The purpose of this test is to validate that a user with valid credentials can successfully log in to the system and be redirected to the list product page.

---

## Automated Test Implementation

The automated test covers the following user flow:

1. Navigate to the login page: `https://www.saucedemo.com/`
2. Enter a valid username
3. Enter a valid password
4. Click the **Login** button
5. Verify that the product listing page is displayed
6. Add at least 2 different products to cart
7. Verify number list product selected in cart
8. Nevigate to the cart page
9. Verify product are visible with correctly
10. Proceed to check out process
11. Provide valid customer info
12. User case reach the checkout overview page
13. Verify Pricing info is presented clearly and consistently
14. Order complete confirmation is displayed
15. logout from web and user returned to login page

### Test framework and tools
- **Playwright**
- **TypeScript**
- **Node.js**

## How to Run the Test

### 1. Install project dependencies
npm install

### 2.1 Execute the test
npx playwright test

### 3. Execute the test in UI mode
npx playwright test --ui

### 4. View the HTML report
npx playwright show-report

Notes

This implementation focuses on the  E2e scenario only.

Additional test coverage that could be included in a full test suite:
	•	Invalid username or password
	•	Required field validation
	•	Session timeout or logout behavior
