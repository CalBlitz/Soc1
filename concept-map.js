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

// Function to generate word clouds and definitions
function generateConceptMaps(data) {
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
    topicData.words.forEach((word) => {
      const wordSpan = document.createElement("span");
      wordSpan.classList.add("word");
      wordSpan.textContent = word.term;
      wordSpan.onclick = () => showDefinition(word.definition, index + 1);
      wordCloud.appendChild(wordSpan);
    });

    topicSection.appendChild(wordCloud);

    // Add definition box
    const definitionBox = document.createElement("div");
    definitionBox.classList.add("definition-box");
    definitionBox.id = `definition-box-${index + 1}`;
    definitionBox.textContent = "Click a term to see its definition here.";
    topicSection.appendChild(definitionBox);

    container.appendChild(topicSection);
  });
}

// Function to show definitions
function showDefinition(definition, index) {
  const definitionBox = document.getElementById(`definition-box-${index}`);
  definitionBox.textContent = definition;
}

// Generate the concept maps
generateConceptMaps(topicsData);
