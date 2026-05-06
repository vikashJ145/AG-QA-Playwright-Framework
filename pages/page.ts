import { Page, expect } from '@playwright/test';

export class SignupPage {

  constructor(private page: Page) { }

  async openHomePage() {
    await this.page.goto('https://automationexercise.com');
  }

  async closePopupIfVisible() {
    const popupCloseBtn = this.page.locator('selector-for-close-button');

    if (await popupCloseBtn.isVisible({ timeout: 3000 })) {
      await popupCloseBtn.click();
    }
  }

  async clickSignupLoginLink() {
    await this.page.click('a[href="/login"]');
  }

  async enterSignupDetails(name: string, email: string) {
    await this.page.fill('input[data-qa="signup-name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
    await this.page.click('button[data-qa="signup-button"]');
  }

  async fillPassword(password: string) {
    await this.page.fill('#password', password);
  }

  async fillFirstName(firstName: string) {
    await this.page.fill('#first_name', firstName);
  }

  async fillLastName(lastName: string) {
    await this.page.fill('#last_name', lastName);
  }

  async fillAddress(address: string) {
    await this.page.fill('#address1', address);
  }

  async fillState(state: string) {
    await this.page.fill('#state', state);
  }

  async fillCity(city: string) {
    await this.page.fill('#city', city);
  }

  async fillZipcode(zipcode: string) {
    await this.page.fill('#zipcode', zipcode);
  }

  async fillPhone(phone: string) {
    await this.page.fill('#mobile_number', phone);
  }

  async clickCreateAccountButton() {
    await this.page.click('button[data-qa="create-account"]');
  }

  async clickContinueButton() {
    await this.page.click('a[data-qa="continue-button"]');
  }

  async clickDeleteAccountButton() {
    await this.page.click('a[href="/delete_account"]');
  }

  // Login Methods
  async fillLoginEmail(email: string) {
    await this.page.fill('input[data-qa="login-email"]', email);
  }

  async fillLoginPassword(password: string) {
    await this.page.fill('input[data-qa="login-password"]', password);
  }

  async clickLoginButton() {
    await this.page.click('button[data-qa="login-button"]');
  }

  async clickLogoutLink() {
    await this.page.locator('a[href="/logout"]').click();
  }

  async clickContactUsLink() {
    await this.page.getByRole('link', { name: 'Contact us' }).click();
  }

  async fillContactName(name: string) {
    await this.page.fill('input[data-qa="name"]', name);
  }

  async fillContactEmail(email: string) {
    await this.page.fill('input[data-qa="email"]', email);
  }

  async fillSubject(subject: string) {
    await this.page.fill('input[data-qa="subject"]', subject);
  }

  async fillMessage(message: string) {
    await this.page.fill('textarea[data-qa="message"]', message);
  }

  async uploadAttachment(filePath: string) {
    await this.page.setInputFiles('input[name="upload_file"]', filePath);
  }

  async clickSubmitButton() {
    await this.page.locator('input[data-qa="submit-button"]').click();
  }

  async clickHomeLink() {
    await this.page.getByRole('link', { name: 'Home' }).click();
  }

  async clickTestCasesLink() {
    this.page.getByRole('link', { name: 'Test Cases' })
  }

  async clickProductsLink() {
    await this.page.getByRole('link', { name: 'Products' }).click();
  }

  async enterProductInSearch(productName: string) {
    await this.page.locator('#search_product').fill(productName);
  }

  async clickSearchButton() {
    await this.page.locator('#submit_search').click();
  }

  async scrollToSubscriptionSection() {
    await this.page.locator('#footer').scrollIntoViewIfNeeded();
  }

  async fillSubscriptionEmail(email: string) {
    await this.page.fill('//input[@id="susbscribe_email"]', email);
  }

  async enterEmailForSubscription(email: string) {
    await this.page.locator('#susbscribe_email').fill(email);
  }

  async clickSubscribeButton() {
    await this.page.locator('#subscribe').click();
  }

  async handleAlertPopup() {
    this.page.once('dialog', async (dialog) => {
      console.log('Popup Message:', dialog.message());
      await dialog.accept();
    });
  }

  async verifySubmissionSuccessMessage() {
    await this.page.locator('.status.alert-success').isVisible();
  }

  async clickCartLink() {
    await this.page.getByRole('link', { name: 'Cart' }).click();
  }

  async addFirstProductToCart() {
    const firstProduct = this.page.locator('.product-image-wrapper').first();
    await firstProduct.hover();
    this.page.locator('.product-overlay a').filter({ hasText: 'Add to cart' }).first().click();
  }

  async clickContinueShoppingButton() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async addSecondProductToCart() {
    const secondProduct = this.page.locator('.product-image-wrapper').nth(1);
    await secondProduct.hover();
    await this.page.locator('.product-overlay a').filter({ hasText: 'Add to cart' }).nth(1).click();
  }

  async clickViewCartLink() {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }

  async clickFirstProductView() {
    await this.page.locator('a:has-text("View Product")').first().click();
  }

  async setProductQuantity(quantity: string) {
    await this.page.fill('#quantity', quantity);
  }

  async clickAddToCartButton() {
    await this.page.getByRole('button', { name: /add to cart/i }).click();
  }

  async removeProductFromCart() {
    await this.page.locator('.cart_quantity_delete').click();
  }

  async verifyCartIsEmpty() {
    await this.page.locator('#empty_cart').isVisible();
  }

  async verifyCategorySectionVisible() {
    await this.page.locator('.left-sidebar').isVisible();
  }

  async clickWomenCategory() {
    await this.page.locator("a[href='#Women']").click();
  }

  async selectWomenDressCategory() {
    await this.page.locator("//a[@href='/category_products/1']").click();
  }

  async clickMenCategory() {
    await this.page.locator("a[href='#Men']").click();
  }

  async selectMenJeansCategory() {
    await this.page.locator("//a[@href='/category_products/6']").click();
  }

  async selectPoloBrand() {
    await this.page.locator("//a[@href='/brand_products/Polo']").click();
  }

  async selectMadameBrand() {
    await this.page.locator("//a[@href='/brand_products/Madame']").click();
  }

  async clickViewProduct() {
    await this.page.getByRole('link', { name: 'View Product' }).first().click();
  }

  async fillReviewName() {
    await this.page.getByPlaceholder('Your Name').fill('Anuj Gupta');
  }

  async fillReviewEmail() {
    await this.page.locator('//input[@placeholder="Email Address"]').fill('anuj@test.com');
  }

  async fillReviewMessage() {
    await this.page.getByPlaceholder('Add Review Here!').fill('This product is very good and useful.');
  }

  async clickSubmitReview() {
    await this.page.locator('#button-review').click();
  }

  async clickScrollUpButton() {
    await this.page.locator('#scrollUp').click();
  }

  async verifyAccountCreated() {
    await expect(this.page.getByText('Account Created!')).toBeVisible();
  }

  async verifyDeleteAccountVisible() {
    await expect(this.page.getByText('Delete Account')).toBeVisible();
  }

  async verifyAccountDeleted() {
    await expect(this.page.getByText('Account Deleted!')).toBeVisible();
  }

  async verifyUserLoggedIn() {
    await expect(this.page.getByText('Logged in as')).toBeVisible();
  }

  async verifySearchedProductsVisible() {
    await expect(this.page.getByText('Searched Products')).toBeVisible();
  }

  async verifySubscriptionSuccess() {
    await expect(this.page.getByText('successfully subscribed')).toBeVisible();
  }

  async verifyFirstProductInCart() {
    await expect(this.page.locator('#product-1')).toBeVisible();
  }

  async verifyProductQuantity(expectedQty: string) {
    await expect(this.page.locator('.cart_quantity button')).toHaveText(expectedQty);
  }

  async verifyReviewSubmitted() {
    await expect(this.page.getByText('Thank you for your review')).toBeVisible();
  }

  async verifyFullFledgedTextVisible() {
    await expect(this.page.getByText('Full-Fledged')).toBeVisible();
  }

}
