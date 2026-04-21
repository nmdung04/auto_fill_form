import { readFileSync } from 'fs';
import { initBrowser } from './src/browser.js';
import { runFormSubmission } from './src/runner.js';

const config = JSON.parse(readFileSync('./config.json', 'utf8'));

// Khởi động browser 1 lần
const browser = await initBrowser(config.headless);

try {
  for (let i = 0; i < config.runs; i++) {
    console.log(`\n📋 Starting run ${i + 1}/${config.runs}`);
    try {
      // Mỗi lần tạo tab mới, không relaunch browser
      await runFormSubmission(browser, config.url, config, i + 1);
      console.log(`✅ Run ${i + 1} completed successfully`);
    } catch (error) {
      console.error(`❌ Run ${i + 1} failed:`, error.message);
    }
  }
} finally {
  // Đóng browser 1 lần ở cuối
  await browser.close();
  console.log(`\n🏁 All runs completed. Browser closed.`);
}