import puppeteer from 'puppeteer';

export async function initBrowser(headless) {
  const browser = await puppeteer.launch({
    headless,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  return browser;
}