// Fetch JSON Data and Generate Concept Maps
fetch("topics.json")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    generateConceptMaps(data); // Pass the JSON data to the generator function
  })
  .catch(error => {
    console.error("Error loading JSON:", error); // Log any errors
  });

function generateRandomPositions(words, containerWidth, containerHeight) {
  const positions = []; // Store positions to avoid collisions

  words.forEach((word) => {
    let overlap = true;
    let attempts = 0;

    while (overlap && attempts < 100) {
      // Generate random X and Y positions
      const x = Math.random() * (containerWidth - 100); // Avoid edges (100px buffer)
      const y = Math.random() * (containerHeight - 30); // Avoid edges (30px buffer)

      // Check for overlap with existing positions
      overlap = positions.some((pos) => {
        const distance = Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));
        return distance < 50; // Minimum distance between words
      });

      if (!overlap) {
        // Apply the random positions
        word.style.left = `${x}px`;
        word.style.top = `${y}px`;
        positions.push({ x, y });
      }

      attempts++;
    }
  });
}

// Function to generate word cloud with random placement
function generateWordClouds(data) {
  const container = document.getElementById("conceptMapsPage");

  data.forEach((topicData, index) => {
    // Create topic section
    const topicSection = document.createElement("div");
    topicSection.classList.add("topic-section");

    // Add topic title
    const title = document.createElement("h2");
    title.textContent = topicData.topic;
    topicSection.appendChild(title);

    // Create word cloud container
    const wordCloud = document.createElement("div");
    wordCloud.classList.add("word-cloud");
    wordCloud.id = `word-cloud-${index + 1}`;

    // Add words to the word cloud
    const words = topicData.words.map((wordData) => {
      const wordSpan = document.createElement("span");
      wordSpan.classList.add("word");
      wordSpan.textContent = wordData.term;
      wordSpan.onclick = () => showDefinition(wordData.definition, index + 1);
      wordCloud.appendChild(wordSpan);
      return wordSpan;
    });

    topicSection.appendChild(wordCloud);
    container.appendChild(topicSection);

    // Randomize word positions after they are added to the DOM
    const containerWidth = wordCloud.offsetWidth;
    const containerHeight = wordCloud.offsetHeight;
    generateRandomPositions(words, containerWidth, containerHeight);
  });
}

// Function to show definitions
function showDefinition(definition, index) {
  const definitionBox = document.getElementById(`definition-box-${index}`);
  definitionBox.textContent = definition;
}

// Generate the concept maps
generateConceptMaps(topicsData);
