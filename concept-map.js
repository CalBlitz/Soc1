function generateRandomStyles(words) {
  const colors = ['#4a90e2', '#50e3c2', '#7ed321', '#f5a623', '#d0021b', '#9013fe'];
  const fontSizes = [14, 18, 22, 26, 30, 36]; // Possible font sizes

  words.forEach((word) => {
    // Randomize color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    word.style.color = randomColor;

    // Randomize font size
    const randomFontSize = fontSizes[Math.floor(Math.random() * fontSizes.length)];
    word.style.fontSize = `${randomFontSize}px`;
  });
}


function generateRandomPositions(words, containerWidth, containerHeight) {
  const positions = []; // Store positions to avoid collisions

  words.forEach((word) => {
    let overlap = true;
    let attempts = 0;

    // Delay calculation to ensure word dimensions are available
    setTimeout(() => {
      const wordWidth = word.offsetWidth;
      const wordHeight = word.offsetHeight;

      while (overlap && attempts < 100) {
        // Generate random X and Y positions, ensuring the words stay within bounds
        const x = Math.random() * (containerWidth - wordWidth); // Fit horizontally
        const y = Math.random() * (containerHeight - wordHeight); // Fit vertically

        // Check for overlap with existing positions
        overlap = positions.some((pos) => {
          const distance = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
          return distance < 50; // Minimum spacing between words
        });

        if (!overlap) {
          // Apply the random positions
          word.style.left = `${x}px`;
          word.style.top = `${y}px`;
          positions.push({ x, y });
        }

        attempts++;
      }
    }, 0); // Delay to ensure dimensions are available
  });
}

// Function to generate word cloud with random placement
function generateWordClouds(data) {
  const container = document.getElementById("conceptMapsPage");

  data.forEach((sectionData) => {
    // Create a section container
    const sectionContainer = document.createElement("div");
    sectionContainer.classList.add("section-container");

    // Add section title
    const sectionTitle = document.createElement("h1");
    sectionTitle.textContent = sectionData.section;
    sectionTitle.classList.add("section-title");
    sectionContainer.appendChild(sectionTitle);

    // Loop through topics in the section
    sectionData.topics.forEach((topicData, topicIndex) => {
      const topicSection = document.createElement("div");
      topicSection.classList.add("topic-section");

    // Add topic title
    const title = document.createElement("h2");
    title.textContent = topicData.topic;
    topicSection.appendChild(title);

    // Create word cloud container
    const wordCloud = document.createElement("div");
    wordCloud.classList.add("word-cloud");

    // Add words to the word cloud
    const words = topicData.words.map((wordData) => {
      const wordSpan = document.createElement("span");
      wordSpan.classList.add("word");
      wordSpan.textContent = wordData.term;
      wordSpan.onclick = () => showDefinition(wordData.definition, `${sectionData.section}-${topicIndex + 1}`);
      wordCloud.appendChild(wordSpan);
      return wordSpan;
    });

    topicSection.appendChild(wordCloud);
    // Randomize word positions after they are added to the DOM
    const containerWidth = wordCloud.offsetWidth;
    setTimeout(() => {
        const containerWidth = wordCloud.offsetWidth;
        const containerHeight = wordCloud.offsetHeight;
        generateRandomPositions(words, containerWidth, containerHeight);
      }, 0);
    generateRandomStyles(words);

    // Add definition box
    const definitionBox = document.createElement("div");
    definitionBox.classList.add("definition-box");
    definitionBox.id = `${sectionData.section}-${topicIndex + 1}`;
    definitionBox.textContent = "Click a term to see its definition here.";
    topicSection.appendChild(definitionBox);
    sectionContainer.appendChild(topicSection);
  });
    container.appendChild(sectionContainer);
  });
}


// Fetch JSON Data and Generate Concept Maps
fetch("topics.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    generateWordClouds(data);
  })
  .catch(error => {
    console.error("Error loading JSON:", error);
  });

// Function to show definitions
function showDefinition(definition, id) {
  const definitionBox = document.getElementById(id);
  if (definitionBox) {
    definitionBox.textContent = definition;
  }
}

