export const config: WebdriverIO.Config = {
	runner: 'local',
	specs: ['./test/**/*.ts'],
	maxInstances: 1,
	capabilities: [
		{
			platformName: 'Android',
			'appium:udid': 'xxxxxx', // ganti dengan device udid
			'appium:deviceName': 'xxxxx', // ubah sesuai device
			'appium:platformVersion': '13', // ubah sesuai versi Android
			'appium:appWaitActivity': '*',
			'appium:app': require('path').resolve(
				'./app/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk' // ganti dengan path ke aplikasi yang akan diuji
			),
			'appium:automationName': 'UiAutomator2',
			'appium:autoGrantPermissions': true,
		},
	],
	logLevel: 'info',
	framework: 'mocha',
	mochaOpts: {
		ui: 'bdd',
		timeout: 60000,
	},
	services: ['appium'],
	before: () => {
		require('ts-node').register({ files: true });
	},
	reporters: [
		'spec', // default output ke terminal
		[
			'allure',
			{
				outputDir: 'allure-results',
				disableWebdriverStepsReporting: false,
				disableWebdriverScreenshotsReporting: false,
			},
		],
	],
	afterTest: async function (_, __, { passed }) {
		if (!passed) {
			await browser.takeScreenshot();
		}
	},
};
