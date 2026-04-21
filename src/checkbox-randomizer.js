// Chọn 1 option duy nhất (cho radio button), có thể bỏ qua n option đầu tiên
export function pickSingleOption(elements, excludeFirstN = 0) {
  if (elements.length === 0) return null;

  const skipCount = Math.max(0, Math.floor(excludeFirstN));
  const candidateOptions = elements.slice(skipCount);
  if (candidateOptions.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * candidateOptions.length);
  return candidateOptions[randomIndex];
}

// Chọn 1-n options (cho checkbox)
export function pickMultipleOptions(elements) {
  const numOptions = elements.length;
  if (numOptions === 0) return [];

  // Randomly pick 1 to numOptions
  const numToPick = Math.floor(Math.random() * numOptions) + 1;
  const shuffled = [...elements].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numToPick);
}
