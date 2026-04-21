import { pickSingleOption, pickMultipleOptions } from './checkbox-randomizer.js';

export async function handleForm(page, config) {
  // Wait for checkboxes/radio to load
  await page.waitForSelector('[class="nWQGrd zwllIb"]', { timeout: 10000 });

  // Get all question groups
  const questionGroups = await page.$$('[role="presentation"]');

  for (const group of questionGroups) {
    const options = await group.$$('[class="nWQGrd zwllIb"]');
    if (options.length > 0) {
      // Detect if it's radio button or checkbox
      const isRadioButton = await isRadioButtonGroup(group);
      
      if (isRadioButton) {
        // Radio button: chỉ chọn 1 option
        const selectedOption = pickSingleOption(options, config.radioExcludeFirstN ?? 0);
        if (selectedOption) {
          await selectedOption.click();
          console.log(`[Radio] Selected 1 out of ${options.length} options (exclude first ${config.radioExcludeFirstN ?? 0})`);
        } else {
          console.log(`[Radio] Skipped: no available option after excluding first ${config.radioExcludeFirstN ?? 0}`);
        }
      } else {
        // Checkbox: chọn 1-n options
        const toClick = pickMultipleOptions(options);
        console.log(`[Checkbox] Selected ${toClick.length} out of ${options.length} options`);
        for (const cb of toClick) {
          await cb.click();
          await delay(config.minDelay, config.maxDelay);
        }
      }
    }
  }
}

// Detect if input group is radio button or checkbox
async function isRadioButtonGroup(groupElement) {
  try {
    // Google Forms render theo ARIA role, không phải input[type].
    const radioOption = await groupElement.$('[role="radio"]');
    if (radioOption) return true;

    const checkboxOption = await groupElement.$('[role="checkbox"]');
    if (checkboxOption) return false;

    // Fallback cho các biến thể DOM: đọc role trực tiếp trên option.
    const firstOption = await groupElement.$('[class="nWQGrd zwllIb"]');
    if (!firstOption) return false;

    const optionRole = await firstOption.evaluate(el => el.getAttribute('role'));
    return optionRole === 'radio';
  } catch {
    // Nếu không detect được, mặc định là checkbox
    return false;
  }
}

function delay(min, max) {
  const ms = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, ms));
}
