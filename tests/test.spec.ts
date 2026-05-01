import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/page';
import fs from 'fs';
import { sign } from 'crypto';


test('Test case 1-Simple Signup Test', async ({ page }) => {

  const signupPage = new SignupPage(page);
  const name = 'anuj';
  const email = `anuj${Math.floor(Math.random() * 1000)}@gmail.com`;
  console.log('email id - ' + email);
  await signupPage.openSite();
  await signupPage.clickOnSignup();
  await signupPage.signup(name, email);
  await signupPage.enterPassword('Test@123');
  await signupPage.enterFirstName('anuj');
  await signupPage.enterLastName('gupta');
  await signupPage.enterAddress('lakshar');
  await signupPage.enterState('Madhya Pradesh');
  await signupPage.enterCity('Gwalior');
  await signupPage.enterZipcode('474001');
  await signupPage.enterPhone('897687649');
  await signupPage.clickCreateAccount();
  await expect(page.getByText('Account Created!')).toBeVisible();
  await signupPage.clickContinueBtn();
  await expect(page.getByText('Delete Account')).toBeVisible();
  await signupPage.clickDeleteAccount();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
});

test('Demo email', async ({ page }) => {

  const signupPage = new SignupPage(page);
  const name = 'anuj';
  const email = `anuj${Math.floor(Math.random() * 1000)}@gmail.com`;

  console.log('Generated Email:', email);

  //  Write email into JSON file
  fs.writeFileSync('utils/testData.json', JSON.stringify({ email }));

  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.clickOnSignup();
  await signupPage.signup(name, email);
  await signupPage.enterPassword('Test@123');
  await signupPage.enterFirstName('anuj');
  await signupPage.enterLastName('gupta');
  await signupPage.enterAddress('lashkar');
  await signupPage.enterState('Madhya Pradesh');
  await signupPage.enterCity('Gwalior');
  await signupPage.enterZipcode('474001');
  await signupPage.enterPhone('897687649');
  await signupPage.clickCreateAccount();
  await expect(page.getByText('Account Created!')).toBeVisible();
  await signupPage.clickContinueBtn();
}); { timeout: 60000 };

test('Test Case 2 - Login User with correct email and password', async ({ page }) => {

  const signupPage = new SignupPage(page);

  // Read email from JSON file
  const data = JSON.parse(fs.readFileSync('utils/testData.json', 'utf-8'));
  const email = data.email;

  const password = 'Test@123';

  console.log('Login Email:', email);

  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.clickOnSignup();
  await expect(page.getByText('Login to your account')).toBeVisible();
  await signupPage.enterLoginEmail(email);
  await signupPage.enterLoginPassword(password);
  await signupPage.clickLoginBtn();
  await expect(page.getByText('Logged in as')).toBeVisible();
  await signupPage.clickDeleteAccount();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
});

test('Test Case 3 - Login User with incorrect email and password', async ({ page }) => {

  const signupPage = new SignupPage(page);

  const email = 'anuj28@gmail.com';
  const password = 'Test@123';

  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.clickOnSignup();
  await expect(page.getByText('Login to your account')).toBeVisible();
  await signupPage.enterLoginEmail(email);
  await signupPage.enterLoginPassword(password);
  await signupPage.clickLoginBtn();
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});

test('Test case 4 - Logout User', async ({ page }) => {

  const signupPage = new SignupPage(page);

  // Read stored email from file
  const filePath = 'utils/testData.json';

  if (!fs.existsSync(filePath)) {
    throw new Error('testData.json not found. Please run Signup test first.');
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!data.email) {
    throw new Error('Email not found in testData.json');
  }

  const email = data.email;
  const password = 'Test@123';

  console.log('Using Email for login:', email);

  //  Step 1: Open Site
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();

  //  Step 2: Click Signup/Login
  await signupPage.clickOnSignup();

  await expect(page.getByText('Login to your account')).toBeVisible();

  //  Step 3: Enter Credentials
  await signupPage.enterLoginEmail(email);
  await signupPage.enterLoginPassword(password);

  await signupPage.clickLoginBtn();

  //  Step 4: Verify Logged in
  await expect(page.getByText(/Logged in as/i)).toBeVisible({ timeout: 10000 });

  //  Step 5: Click Logout
  await signupPage.clickLogout();

  // Step 6: Verify logout successful
  await expect(page.getByText('Login to your account')).toBeVisible({ timeout: 10000 });

});

test('Test case 5 - Register User with existing email', async ({ page }) => {

  const signupPage = new SignupPage(page);

  //  Generate random email
  const email = `anuj${Math.floor(Math.random() * 10000)}@gmail.com`;

  console.log('Generated Email:', email);

  //  Step 1: Open site
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.clickOnSignup();

  //  Step 2: Register user first time (should succeed)
  await signupPage.signup('Anuj', email);

  //  Store email in JSON file
  fs.writeFileSync(
    'utils/testData.json',
    JSON.stringify({ email }, null, 2)
  );

  //  Logout after successful registration
  await signupPage.clickLogout();

  //  Step 3: Try registering again with SAME email
  await signupPage.clickOnSignup();
  await signupPage.signup('Anuj', email);

  //  Step 4: Verify error message
  await expect(page.getByText('Email Address already exist!')).toBeVisible();

});

test('Test Case 6 - Contact Us Form', async ({ page }) => {

  const signupPage = new SignupPage(page);

  //  Launch browser & Navigate to URL
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();

  //  Click Contact Us
  await signupPage.clickContactUs();

  //  Verify GET IN TOUCH is visible
  await expect(page.getByText('GET IN TOUCH')).toBeVisible();

  //  Enter form details
  await signupPage.enterName('Anuj');
  await signupPage.enterEmail('anuj@test.com');
  await signupPage.enterSubject('Test Subject');
  await signupPage.enterMessage('This is test message');

  // Handle popup
  await signupPage.handleSubmitPopup();

  // Click submit
  await signupPage.clickSubmit();

  //  Verify Success Message  
  await signupPage.verifySuccessMessage();
});

test('Test case 7-Verify test case pages', async ({ page }) => {

  const signupPage = new SignupPage(page);

  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.clickTestCases();
  const closePopup = page.getByRole('button', { name: 'Close' });

  if (await closePopup.isVisible()) {
    await closePopup.click({ force: true });
  }
  await expect(page.locator('h2.title.text-center b')).toHaveText('Test Cases');

});

test('Test case 8-Verify all product and product detail page', async ({ page }) => {

  const signupPage = new SignupPage(page);

  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.clickOnProducts();
  await expect(page.locator('h2.title.text-center')).toHaveText('All Products');
  await expect(page.locator('.features_items')).toBeVisible();
  await page.locator('a:has-text("View Product")').first().click();
  await expect(page).toHaveURL(/product_details/);
  await expect(page.getByText('Blue Top')).toBeVisible();
  await expect(page.getByText('Category: Women > Tops')).toBeVisible();
  await expect(page.getByText('Rs. 500')).toBeVisible();
  await expect(page.getByText('Availability: In Stock')).toBeVisible();
  await expect(page.getByText('Condition: New')).toBeVisible();
  await expect(page.getByText('Brand: Polo')).toBeVisible();
});

test('Test case 9-Search Product', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.clickOnProducts();
  await expect(page.locator('h2.title.text-center')).toHaveText('All Products');
  await signupPage.searchProduct('Tshirt');
  await signupPage.clickOnSearch();
  // Verify 'SEARCHED PRODUCTS' is visible
  await expect(page.locator('h2.title.text-center')).toHaveText('Searched Products');
  // Verify all products related to search are visible
  await expect(page.locator('.features_items')).toBeVisible();
});

test('Test Case 10 - Verify Subscription in Home Page', async ({ page }) => {

  const signupPage = new SignupPage(page);

  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.scrollToFooter();
  await expect(page.locator('text=SUBSCRIPTION')).toBeVisible();
  await signupPage.enterSubscriptionEmail('anujtest123@gmail.com');
  await signupPage.clickSubscribeButton();
  await expect(page.locator('text=You have been successfully subscribed!')).toBeVisible();

});

test('Test Case 11 - Verify Subscription in Cart Page', async ({ page }) => {

  const signupPage = new SignupPage(page);

  //  Launch browser & Navigate to site
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();

  //  Click Cart button
  await signupPage.clickCart();

  //  Scroll to footer
  await signupPage.scrollToFooter();

  //  Verify SUBSCRIPTION text
  await expect(page.locator('text=SUBSCRIPTION')).toBeVisible();

  //  Enter email
  await signupPage.enterSubscriptionEmail('anujtest123@gmail.com');

  //  Click subscribe button
  await signupPage.clickSubscribeButton();

  //  Verify success message
  await expect(page.locator('text=You have been successfully subscribed!')).toBeVisible();

});

test('Test Case 12 - Add Products in Cart', async ({ page }) => {

  const signupPage = new SignupPage(page);

  // Launch browser
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();

  // Click Products
  await signupPage.clickOnProducts();

  // Hover first product and click Add to cart
  await signupPage.addFirstProductToCart();

  // Click Continue Shopping
  await signupPage.clickContinueShopping();

  // Hover second product and click Add to cart
  await signupPage.addSecondProductToCart();

  // Click View Cart
  await signupPage.clickViewCart();

  // Verify both products are visible
  await expect(page.locator('#product-1')).toBeVisible();
  await expect(page.locator('#product-2')).toBeVisible();

  // Verify price, quantity and total
  await expect(page.locator('#product-1 .cart_price')).toBeVisible();
  await expect(page.locator('#product-1 .cart_quantity')).toBeVisible();
  await expect(page.locator('#product-1 .cart_total')).toBeVisible();
  await expect(page.locator('#product-2 .cart_price')).toBeVisible();
  await expect(page.locator('#product-2 .cart_quantity')).toBeVisible();
  await expect(page.locator('#product-2 .cart_total')).toBeVisible();

});

test('Test Case 13 - Verify Product quantity in Cart', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.clickFirstViewProduct();
  await expect(page).toHaveURL(/product_details/);
  await signupPage.setProductQuantity('4');
  await signupPage.clickAddToCart();
  await signupPage.clickViewCart();
  await expect(page.locator('.cart_quantity button')).toHaveText('4');

});

test('Test case 17 - Remove Product From Cart', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.clickFirstViewProduct();
  await signupPage.closePopupIfPresent();
  await signupPage.setProductQuantity('3');
  await signupPage.clickAddToCart();
  await signupPage.clickViewCart();
  await signupPage.clickOnCrossButton();
  await signupPage.VerifyCartIsEmpty();
});

test('Test case 18 - Verify Category Product', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openSite();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await signupPage.closePopupIfPresent();
  await signupPage.verifyCategory();
  await signupPage.clickOnWomenCategory();
  await signupPage.clickOnDress();
  await expect(page.getByText('Women - Dress Products')).toBeVisible();
  await signupPage.clickOnMenCategory();
  await signupPage.clickOnJeans();
  await expect(page.getByText('Men - Jeans Products')).toBeVisible();
})

test('Test case 19- View and Cart Brand Product', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.clickOnProducts();
  await expect(page.getByText('Brands')).toBeVisible();
  await signupPage.clickOnPolo();
  await expect(page.getByText('Brand - Polo Products')).toBeVisible();
  await signupPage.clickOnMadame();
  await expect(page.getByText('Brand - Madame Products')).toBeVisible();
})

test('Test case 21- Add review on product', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await signupPage.clickOnProducts();
  await expect(page.getByText('All Products')).toBeVisible();
  await signupPage.clickOnViewProduct();
  await expect(page.getByText('Write Your Review')).toBeVisible();
  await signupPage.fillName();
  await signupPage.fillEmailAddress();
  await signupPage.addYourReview();
  await signupPage.clickOnSubmit();
  await expect(page.getByText('Thank you for your review.')).toBeVisible();
})

test('Test case 22- Add to cart from recommended items', async ({ page }) => {
  const signupPage = new SignupPage(page);
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  // 2. Scroll to bottom of page
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // 3. Verify 'RECOMMENDED ITEMS' is visible
  await expect(page.getByText('RECOMMENDED ITEMS')).toBeVisible();
  // 4. Click on 'Add to cart' for recommended product
  const recommendedProduct = page.locator('.recommended_items .product-overlay').first();
  await recommendedProduct.hover();
  await recommendedProduct.locator('a:has-text("Add to cart")').click();
  // 5. Click 'View Cart'
  await page.getByRole('link', { name: 'View Cart' }).click();
  // 6. Verify product is added to cart
  await expect(page.getByText('Shopping Cart')).toBeVisible();
})

test('Test Case 25 - Verify Scroll Up using Arrow button and Scroll Down functionality', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.getByText('SUBSCRIPTION')).toBeVisible();
  await signupPage.clickOnScrollButton();
  await expect(page.getByText('Full-Fledged practice website', { exact: false })).toBeVisible();
});

test('Test Case 26 - Scroll Up without Arrow & Scroll Down', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openSite();
  await signupPage.closePopupIfPresent();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await expect(page.getByText('SUBSCRIPTION')).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
})
