import { Page } from '@playwright/test';

export class SignupPage {

  constructor(private page: Page) { }

  async openSite() {
    await this.page.goto('https://automationexercise.com');
  }

  async closePopupIfPresent() {
    const popupCloseBtn = this.page.locator('selector-for-close-button');

    if (await popupCloseBtn.isVisible({ timeout: 3000 })) {
      await popupCloseBtn.click();
    }
  }

  async clickOnSignup() {
    await this.page.click('a[href="/login"]');
  }

  async signup(name: string, email: string) {
    await this.page.fill('input[data-qa="signup-name"]', name);
    await this.page.fill('input[data-qa="signup-email"]', email);
    await this.page.click('button[data-qa="signup-button"]');
  }

  async enterPassword(password: string) {
    await this.page.fill('#password', password);
  }

  async enterFirstName(firstName: string) {
    await this.page.fill('#first_name', firstName);
  }

  async enterLastName(lastName: string) {
    await this.page.fill('#last_name', lastName);
  }

  async enterAddress(address: string) {
    await this.page.fill('#address1', address);
  }

  async enterState(state: string) {
    await this.page.fill('#state', state);
  }

  async enterCity(city: string) {
    await this.page.fill('#city', city);
  }

  async enterZipcode(zipcode: string) {
    await this.page.fill('#zipcode', zipcode);
  }

  async enterPhone(phone: string) {
    await this.page.fill('#mobile_number', phone);
  }

  async clickCreateAccount() {
    await this.page.click('button[data-qa="create-account"]');
  }

  async clickContinueBtn() {
    await this.page.click('a[data-qa="continue-button"]');
  }

  async clickDeleteAccount() {
    await this.page.click('a[href="/delete_account"]');
  }

  // Login Methods
  async enterLoginEmail(email: string) {
    await this.page.fill('input[data-qa="login-email"]', email);
  }

  async enterLoginPassword(password: string) {
    await this.page.fill('input[data-qa="login-password"]', password);
  }

  async clickLoginBtn() {
    await this.page.click('button[data-qa="login-button"]');
  }

  async clickLogout() {
    await this.page.locator('a[href="/logout"]').click();
  }

  async clickContactUs() {
    await this.page.getByRole('link', { name: 'Contact us' }).click();
  }

  async enterName(name: string) {
    await this.page.fill('input[data-qa="name"]', name);
  }

  async enterEmail(email: string) {
    await this.page.fill('input[data-qa="email"]', email);
  }

  async enterSubject(subject: string) {
    await this.page.fill('input[data-qa="subject"]', subject);
  }

  async enterMessage(message: string) {
    await this.page.fill('textarea[data-qa="message"]', message);
  }

  async uploadFile(filePath: string) {
    await this.page.setInputFiles('input[name="upload_file"]', filePath);
  }

  async clickSubmit() {
    await this.page.locator('input[data-qa="submit-button"]').click();
  }

  async clickHome() {
    await this.page.getByRole('link', { name: 'Home' }).click();
  }

  async clickTestCases() {
    await this.page.locator("//a[text()=' Test Cases']").click();
  }

  async clickOnProducts() {
    await this.page.getByRole('link', { name: 'Products' }).click();
  }

  async searchProduct(productName: string) {
    await this.page.locator("//input[@id='search_product']").fill(productName);
  }

  async clickOnSearch() {
    await this.page.locator("//button[@id='submit_search']").click();
  }

  async scrollToFooter() {
    await this.page.locator('text=SUBSCRIPTION').scrollIntoViewIfNeeded();
  }

  async enterSubscriptionEmail(email: string) {
    await this.page.fill('//input[@id="susbscribe_email"]', email);
  }

  async enterEmailForSubscription(email: string) {
    await this.page.locator('#susbscribe_email').fill(email);
  }

  async clickSubscribeButton() {
    await this.page.locator('#subscribe').click();
  }

  async handleSubmitPopup() {
    this.page.once('dialog', async (dialog) => {
      console.log('Popup Message:', dialog.message());
      await dialog.accept();   // Click OK button
    });
  }

  async verifySuccessMessage() {
    await this.page.locator("(//div[text()='Success! Your details have been submitted successfully.'])[1]").isVisible();
  }

  async clickCart() {
    await this.page.getByRole('link', { name: 'Cart' }).click();
  }

  async addFirstProductToCart() {
    const firstProduct = this.page.locator('.product-image-wrapper').first();
    await firstProduct.hover();
    await this.page.locator('.product-overlay a:has-text("Add to cart")').first().click();
  }

  async clickContinueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async addSecondProductToCart() {
    const secondProduct = this.page.locator('.product-image-wrapper').nth(1);
    await secondProduct.hover();
    await this.page.locator('.product-overlay a:has-text("Add to cart")').nth(1).click();
  }

  async clickViewCart() {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }

  async clickFirstViewProduct() {
    await this.page.locator('a:has-text("View Product")').first().click();
  }

  async setProductQuantity(quantity: string) {
    await this.page.fill('#quantity', quantity);
  }

  async clickAddToCart() {
    await this.page.locator('button:has-text("Add to cart")').click();
  }

  async clickOnCrossButton() {
    await this.page.locator("//a[@class='cart_quantity_delete']").click();
  }

  async VerifyCartIsEmpty() {
    await this.page.locator("//b[text()='Cart is empty!']").isVisible();
  }

  async verifyCategory() {
    await this.page.locator("//h2[text()='Category']").isVisible();
  }

  async clickOnWomenCategory() {
    await this.page.locator("a[href='#Women']").click();
  }

  async clickOnDress() {
    await this.page.locator("//a[@href='/category_products/1']").click();
  }

  async clickOnMenCategory() {
    await this.page.locator("a[href='#Men']").click();
  }

  async clickOnJeans() {
    await this.page.locator("//a[@href='/category_products/6']").click();
  }

  async clickOnPolo() {
    await this.page.locator("//a[@href='/brand_products/Polo']").click();
  }

  async clickOnMadame() {
    await this.page.locator("//a[@href='/brand_products/Madame']").click();
  }

  async clickOnViewProduct() {
    await this.page.getByRole('link', { name: 'View Product' }).first().click();
  }

  async fillName() {
    await this.page.getByPlaceholder('Your Name').fill('Anuj Gupta');
  }

  async fillEmailAddress() {
    await this.page.locator('//input[@placeholder="Email Address"]').fill('anuj@test.com');
  }

  async addYourReview() {
    await this.page.getByPlaceholder('Add Review Here!').fill('This product is very good and useful.');
  }

  async clickOnSubmit() {
    await this.page.locator('#button-review').click();
  }

  async clickOnScrollButton() {
    await this.page.locator('#scrollUp').click();
  }

}
