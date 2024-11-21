function showDefinition(definition) {
    // Find the definition box closest to the clicked word
    const definitionBox = event.target.parentElement.nextElementSibling;
    definitionBox.textContent = definition;
  };

const words = document.querySelectorAll('.word-cloud .word');

const colors = ['#4a90e2', '#50e3c2', '#7ed321', '#f5a623', '#d0021b', '#9013fe'];
const fontSizes = [15, 20, 25, 30, 35, 40];

words.forEach(word => {
  const randomFontSize = fontSizes[Math.floor(Math.random() * fontSizes.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  word.style.fontSize = `${randomFontSize}px`;
  word.style.color = randomColor;
});
