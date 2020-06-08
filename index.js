/**
 * I'm your spirit friend
 */

const { chromium } = require('playwright-chromium');

const timeout = (ms = 1000) => new Promise(res => {
  setTimeout(() => res(), ms);
});

/**
 * @description
 * This is automated software which using NodeJS, playwright and Chromium
 * https://www.e-draft.am/ doesn't use trusted users registration
 * Everyone can use fake accounts for voting
 * Also I have an automated registration software
 * This is a simple example how easy to login and vote to all drafts
 * Your software is vulnerable, please contact to Helix and ask them to fix it)))
 */
(async () => {
  // Linux: ~/.config/chromium
  // MacOS: ~/Library/Application Support/Chromium
  // Windows: %LOCALAPPDATA%\Chromium\User Data
  const browser = await chromium.launchPersistentContext('~/.config/chromium', { headless: false });
  const page = await browser.newPage({
    offline: false,
  });
  await timeout(7000);


  // Login
  async function login() { 
    await page.waitForSelector('#sign-txt');
    await page.click('#sign-txt');
    await page.fill('input[name=email]', 'email');
    await page.fill('input[name=password]', 'password');
    await page.click('button[type=submit]');
    await page.waitForNavigation();
  }

  await page.goto('');
  await login();

  const elements = await page.$$('.archived-article a');
  const length = elements.length;
  for (let i = 0; i < length; i++) {
    const elements = await page.$$('.archived-article a');
    await elements[i].click();
    // const vote = await page.$('.vote-btn[data-action=yes]');
    // await vote.click();
    await timeout();
    await page.goBack();
  }
})();