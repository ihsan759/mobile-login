# 📱 Mobile Automation Testing with WebdriverIO + Appium

## 🛠️ Project Structure

```
MOBILE-LOGIN/
├── allure-report/                    # Allure HTML report (auto generated)
├── allure-results/                   # Allure result output (auto generated)
├── app/
│   └── Android.SauceLabs.Mobile.Sample.app.2.7.1.apk  # APK sudah disediakan
├── node_modules/                     # Dependencies (auto generated)
├── test/
│   └── login.test.ts                 # Example test
├── .gitignore                        # Ignore unnecessary files for Git
├── package.json                      # Project metadata & scripts
├── package-lock.json                 # Exact dependency versions
├── README.md                         # Project guide
├── tsconfig.json                     # TypeScript config
├── wdio.conf.ts                      # WDIO configuration
└── wdio.d.ts                         # WDIO TypeScript declarations
```

**Rekomendasi `.gitignore`**:

```
node_modules/
allure-results/
allure-report/
```

---

## 🚀 Getting Started

### Install Dependencies

```bash
npm install
```

Install Appium CLI jika belum:

```bash
npm install -g appium
```

---

## 📲 APK Sudah Tersedia

File APK untuk pengujian **sudah disediakan** di folder `app/`:

```
app/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
```

### Install App

```
adb install -r ./app/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
```

Pastikan path di `wdio.conf.ts` sesuai:

```ts
'appium:app': require('path').resolve(
  './app/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'
),
```

---

## 🔌 Connect Android Device

1. Aktifkan Developer Options & USB Debugging:
   - Settings > About Phone > tap Build number 7x

   - Developer Options > USB Debugging

2. Cek koneksi ADB:

```bash
adb devices
```

Harus muncul device/emulator terdeteksi.

---

## ⚙️ WDIO Configuration (`wdio.conf.ts`)

Contoh `wdio.conf.ts`:

```ts
export const config: WebdriverIO.Config = {
	runner: 'local',
	specs: ['./test/**/*.ts'],
	maxInstances: 1,
	capabilities: [
		{
			platformName: 'Android',
			'appium:udid': 'xxxxxx', // Ganti dengan UDID device nyata/emulator
			'appium:deviceName': 'xxxxx', // Nama device
			'appium:platformVersion': '13', // Versi Android
			'appium:appWaitActivity': '*',
			'appium:app': require('path').resolve(
				'./app/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'
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
		'spec',
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
```

### ✅ Penting:

1️⃣ Jalankan Appium sebelum testing:

```bash
appium
```

2️⃣ `udid` & `deviceName` harus sesuai:

```bash
adb devices
```

3️⃣ Path APK sudah benar, Appium akan otomatis install.

4️⃣ Jalankan test:

```bash
npm run test
```

---

## 📸 Auto Screenshot on Failure

Sudah diatur di `afterTest`.

---

## 📊 Allure Report

Generate dan buka report:

```bash
npm install -g allure-commandline
npm run report
```

---

## ❓ Troubleshooting

| Issue                         | Solution                                           |
| ----------------------------- | -------------------------------------------------- |
| `allure` not recognized       | `npm install -g allure-commandline`                |
| `driver.reset` not a function | Ganti ke `driver.resetApp()`                       |
| `isDisplayed()` not found     | Gunakan `waitForDisplayed()` tanpa disimpan ke var |

---

📌 **Author:** [Muhamad Ichsan Dwi Farhana](https://www.linkedin.com/in/muhamad-ichsan-dwi-farhana-4a74291a3/)
