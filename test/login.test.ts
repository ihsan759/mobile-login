import { expect } from 'chai';

describe('Login Testing - Sample App', () => {
	before(async () => {
		await driver.pause(3000); // tunggu app siap
	});

	it('should login successfully with valid credentials', async () => {
		const usernameInput = await $('~test-Username');
		const passwordInput = await $('~test-Password');
		const loginButton = await $('~test-LOGIN');

		await usernameInput.setValue('standard_user');
		await passwordInput.setValue('secret_sauce');
		await loginButton.click();

		const productsTitle = await $('~test-PRODUCTS');
		await productsTitle.waitForDisplayed({ timeout: 5000 });
		expect(await productsTitle.isDisplayed()).to.be.true;
	});

	it('should fail login with invalid credentials', async () => {
		await driver.reloadSession(); // reset app state

		const usernameInput = await $('~test-Username');
		const passwordInput = await $('~test-Password');
		const loginButton = await $('~test-LOGIN');

		await usernameInput.setValue('invalid_user');
		await passwordInput.setValue('wrong_password');
		await loginButton.click();

		const errorMessage = await $('~test-Error message');
		expect(await errorMessage.isDisplayed()).to.be.true;
	});
});
