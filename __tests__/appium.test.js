import wd from 'wd';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
chai.should();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
const PORT = 4723;
const androidConfig = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  app: './android/app/build/outputs/apk/app-debug.apk' // relative to root of project
};
const iosConfig = {
  platformName: 'iOS',
  deviceName: 'iPhone Simulator',
  automationName: 'XCUITest',
  app: 'path/to.app',
};
const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
  await driver.init(androidConfig);
  await driver.sleep(2000); // wait for app to load
})

test('appium renders', async () => {
	const element = await driver.waitForElementByAccessibilityId('welcomeLabel');
	const text = await element.text();
	console.log(text);
  expect(text).toEqual('Welcome to React Native!');
});
