export async function clickNextOrSubmit(page) {
  // Try next buttons first
  const nextSelectors = ['text="Tiếp"', 'text="Next"', '[jsname="OCpkoe"]', 'class="NPEfkd RveJvd snByac"'];
  for (const selector of nextSelectors) {
    try {
      await page.click(selector);
      return;
    } catch {
      // Continue to next
    }
  }
  throw new Error('No next button found');
}

export async function clickSubmit(page) {
  // Try submit buttons
  const submitSelectors = ['text="Submit"', 'text="Gửi"', '[jsname="ksKsZd"]', '[jsname="M2UYVd"]'];
  for (const selector of submitSelectors) {
    try {
      await page.click(selector);
      return;
    } catch {
      // Continue to next
    }
  }
  throw new Error('No submit button found');
}