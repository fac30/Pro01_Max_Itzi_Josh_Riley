// Function to fetch JSON data and create event cards
async function fetchData(type) {
  try {
    // Fetch the JSON data
    const response = await fetch(`/data/${type}.json`);
    const eventsData = await response.json(); // Parse the JSON data
    createCard(eventsData, type); // Call the function to create event cards
  } catch (error) {
    console.error("Error fetching events data:", error);
  }
}

/* to import different event and their data:
    events[event number(integer)]
        .img: image url
        .title: name of event
        .name: person giving the talk
        .date: in Date time string format use javascript Date() constructor to access - new Date(events[i].date)
        .location: location string
        .locationUrl: Google maps url
        .description: description about event
    team[team member number(integer)]
        .img: image filepath
        .title: role
        .name: name of team member
        .description: description about team member
*/

function createCard(data, type) {
  const isEvent = type === "events";
  const container = document.querySelector(`.${type}-container`); // Select the container div

  // Loop through the events data
  data.forEach((dataEntry) => {
    // Create the card container
    const card = document.createElement("div");
    card.className = `${type}-card`;

    // Create and set the image element
    const img = document.createElement("img");
    img.src = dataEntry.img;
    img.alt = `Image of ${dataEntry.name}`;

    // Create and set the title element
    const title = document.createElement("h3");
    title.className = `${type}-title`;
    title.textContent = dataEntry.title;

    // Create and set the speaker name element
    const name = document.createElement("h2");
    name.className = `${type}-name`;
    name.textContent = dataEntry.name;

    // Create and set the date & location element
    let dateLocation;
    let button;
    let descriptionDiv;

    if (isEvent) {
      dateLocation = document.createElement("h4");
      dateLocation.className = `${type}-date`;
      const eventDate = new Date(dataEntry.date);
      const formattedDate = eventDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      dateLocation.textContent = `${formattedDate} - `;

      // Create and set the location link
      const locationUrl = document.createElement("a");
      locationUrl.href = dataEntry.locationUrl;
      locationUrl.textContent = dataEntry.location;
      locationUrl.target = "_blank"; // Open the link in a new tab

      // Append the location link to the dateLocation element
      dateLocation.appendChild(locationUrl);

      // Create and set the button element
      button = document.createElement("button");
      button.className = `${type}-button`;
      button.textContent = "Buy Tickets";
    } else {
      descriptionDiv = document.createElement("div");
      descriptionDiv.className = `${type}-descriptionDiv`;
    }

    // Create and set the description paragraph
    const description = document.createElement("p");
    description.className = `${type}-description`;
    description.textContent = dataEntry.description;

    // Append all created elements to the card container
    card.appendChild(img);
    if (isEvent) {
      card.appendChild(title);
      card.appendChild(name);
      card.appendChild(dateLocation);
      card.appendChild(description);
      card.appendChild(button);
    } else {
      descriptionDiv.appendChild(title);
      descriptionDiv.appendChild(name);
      descriptionDiv.appendChild(description);
      card.appendChild(descriptionDiv);
    }

    // Append the card to the container
    container.appendChild(card);
  });
}

// Call the function to generate the event cards
fetchData("events");
fetchData("team");
