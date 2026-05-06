import { test, expect, Page } from 'playwright/test';
import { SignupPage } from '../pages/page';
import fs from 'fs';

test('Test case 1-Simple Signup Test', async ({ page }: { page: Page }) => {

  const signupPage = new SignupPage(page);
  const name = 'anuj';
  const email = `anuj${Math.floor(Math.random() * 1000)}@gmail.com`;

  await signupPage.openHomePage();
  await signupPage.clickSignupLoginLink();
  await signupPage.enterSignupDetails(name, email);
  await signupPage.fillPassword('Test@123');
  await signupPage.fillFirstName('anuj');
  await signupPage.fillLastName('gupta');
  await signupPage.fillAddress('lakshar');
  await signupPage.fillState('Madhya Pradesh');
  await signupPage.fillCity('Gwalior');
  await signupPage.fillZipcode('474001');
  await signupPage.fillPhone('897687649');
  await signupPage.clickCreateAccountButton();
  await signupPage.verifyAccountCreated();
  await signupPage.clickContinueButton();
  await signupPage.verifyDeleteAccountVisible();
  await signupPage.clickDeleteAccountButton();
  await signupPage.verifyAccountDeleted();
});


test('Demo email', async ({ page }) => {

  const signupPage = new SignupPage(page);
  const email = `anuj${Math.floor(Math.random() * 1000)}@gmail.com`;

  fs.writeFileSync('utils/testData.json', JSON.stringify({ email }));

  await signupPage.openHomePage();
  await signupPage.closePopupIfVisible();
  await signupPage.clickSignupLoginLink();
  await signupPage.enterSignupDetails('anuj', email);
  await signupPage.fillPassword('Test@123');
  await signupPage.fillFirstName('anuj');
  await signupPage.fillLastName('gupta');
  await signupPage.fillAddress('lashkar');
  await signupPage.fillState('Madhya Pradesh');
  await signupPage.fillCity('Gwalior');
  await signupPage.fillZipcode('474001');
  await signupPage.fillPhone('897687649');
  await signupPage.clickCreateAccountButton();
  await signupPage.verifyAccountCreated();
  await signupPage.clickContinueButton();
});


test('Test Case 2 - Login User', async ({ page }) => {

  const signupPage = new SignupPage(page);
  const data = JSON.parse(fs.readFileSync('utils/testData.json', 'utf-8'));
  await signupPage.openHomePage();
  await signupPage.closePopupIfVisible();
  await signupPage.clickSignupLoginLink();
  await signupPage.fillLoginEmail(data.email);
  await signupPage.fillLoginPassword('Test@123');
  await signupPage.clickLoginButton();
  await signupPage.verifyUserLoggedIn();
  await signupPage.clickDeleteAccountButton();
});


test('Test Case 6 - Contact Us', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openHomePage();
  await signupPage.closePopupIfVisible();
  await signupPage.clickContactUsLink();
  await signupPage.fillContactName('Anuj');
  await signupPage.fillContactEmail('anuj@test.com');
  await signupPage.fillSubject('Test');
  await signupPage.fillMessage('Message');
  await signupPage.handleAlertPopup();
  await signupPage.clickSubmitButton();
  await signupPage.verifySubmissionSuccessMessage();
});


test('Test Case 9 - Search Product', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openHomePage();
  await signupPage.closePopupIfVisible();
  await signupPage.clickProductsLink();
  await signupPage.enterProductInSearch('Tshirt');
  await signupPage.clickSearchButton();
  await signupPage.verifySearchedProductsVisible();
});


test('Test Case 10 - Subscription', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openHomePage();
  await signupPage.closePopupIfVisible();
  await signupPage.scrollToSubscriptionSection();
  await signupPage.fillSubscriptionEmail('test@gmail.com');
  await signupPage.clickSubscribeButton();
  await signupPage.verifySubscriptionSuccess();
});


test('Test Case 12 - Add to Cart', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openHomePage();
  await signupPage.closePopupIfVisible();
  await signupPage.clickProductsLink();
  await signupPage.addFirstProductToCart();
  await signupPage.clickContinueShoppingButton();
  await signupPage.addSecondProductToCart();
  await signupPage.clickViewCartLink();
  await signupPage.verifyFirstProductInCart();
});


test('Test Case 13 - Quantity', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openHomePage();
  await signupPage.closePopupIfVisible();
  await signupPage.clickFirstProductView();
  await signupPage.setProductQuantity('4');
  await signupPage.clickAddToCartButton();
  await signupPage.clickViewCartLink();
  await signupPage.verifyProductQuantity('4');
});


test('Test Case 17 - Remove Cart', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openHomePage();
  await signupPage.closePopupIfVisible();
  await signupPage.clickFirstProductView();
  await signupPage.setProductQuantity('3');
  await signupPage.clickAddToCartButton();
  await signupPage.clickViewCartLink();
  await signupPage.removeProductFromCart();
  await signupPage.verifyCartIsEmpty();
});


test('Test Case 21 - Review', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openHomePage();
  await signupPage.closePopupIfVisible();
  await signupPage.clickProductsLink();
  await signupPage.clickViewProduct();
  await signupPage.fillReviewName();
  await signupPage.fillReviewEmail();
  await signupPage.fillReviewMessage();
  await signupPage.clickSubmitReview();
  await signupPage.verifyReviewSubmitted();
});


test('Test Case 25 - Scroll', async ({ page }) => {

  const signupPage = new SignupPage(page);
  await signupPage.openHomePage();
  await signupPage.closePopupIfVisible();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await signupPage.clickScrollUpButton();
  await signupPage.verifyFullFledgedTextVisible();
});