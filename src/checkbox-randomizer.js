// Chọn 1 option duy nhất (cho radio button)
export function pickSingleOption(elements) {
  if (elements.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * elements.length);
  return elements[randomIndex];
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