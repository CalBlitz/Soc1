function showDefinition(definition) {
    // Find the definition box closest to the clicked word
    const definitionBox = event.target.parentElement.nextElementSibling;
    definitionBox.textContent = definition;
  }
  