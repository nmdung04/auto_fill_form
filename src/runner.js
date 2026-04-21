import { handleForm } from './form-handler.js';
import { clickNextOrSubmit, clickSubmit } from './navigation.js';

export async function runFormSubmission(browser, url, config, runNumber) {
  // Mở tab mới
  const page = await browser.newPage();

  try {
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    await page.goto(url, { waitUntil: 'networkidle0' });

    let pageNum = 1;
    while (true) {
      console.log(`[Run ${runNumber}] Handling page ${pageNum}`);

      // Wait for form elements
      await page.waitForSelector('[class="nWQGrd zwllIb"]', { timeout: 10000 });

      await handleForm(page, config);

      // Try to click next
      try {
        await clickNextOrSubmit(page);
        await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 });
        pageNum++;
      } catch {
        // No next button, assume it's the submit page
        await clickSubmit(page);
        // Sau khi click submit, chờ xác nhận gửi thành công
        try {
          // Thường Google Form sẽ hiện trang cảm ơn với class="vHW8K"
          await page.waitForSelector('.vHW8K, .freebirdFormviewerViewResponseConfirmationMessage', { timeout: 10000 });
          console.log(`[Run ${runNumber}] Form submitted and confirmation detected.`);
        } catch {
          console.warn(`[Run ${runNumber}] Đã click gửi nhưng KHÔNG phát hiện xác nhận gửi thành công!`);
        }
        break;
      }
    }
  } finally {
    // Đóng tab
    await page.close();
  }
}