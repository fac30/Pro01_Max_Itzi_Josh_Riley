// Import the JSON file using require
const eventsData = require('../data/events.json');
const teamData = require('../data/team.json');

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



console.log(new Date(eventsData[5].date)); // This will log the date of the fifth event
console.log(teamData[3].name); // This will log Max's name


function createCard(data, type) {
    const container = document.querySelector(`.${type}-container`); // Select the container div
  
    // Loop through the events data
    data.forEach(dataEntry => {
        // Create the card container
        const card = document.createElement('div');
        card.className = `.${type}-card`;
    
        // Create and set the image element
        const img = document.createElement('img');
        img.src = dataEntry.img;
        img.alt = `Image of ${dataEntry.name}`;
    
        // Create and set the title element
        const title = document.createElement('h3');
        title.textContent = dataEntry.title;

        // Create and set the speaker name element
        const name = document.createElement('h2');
        name.textContent = dataEntry.name;
            
        // Create and set the date & location element
        if (dataEntry.date) {
            const dateLocation = document.createElement('h4');
            dateLocation.textContent = new Date(dataEntry.date)
            // Create and set the location link
            const locationUrl = document.createElement('a');
            locationUrl.href = dataEntry.locationUrl;
            locationUrl.textContent = dataEntry.location;
            locationUrl.target = '_blank'; // Open the link in a new tab
            // Append the location link to the dateLocation element
            dateLocation.appendChild(locationUrl);
            // Create and set the button element
            const button = document.createElement('button');
            button.className = `${type}-button`;
            button.textContent = 'Buy Tickets';
        }
        
        // Create and set the description paragraph
        const description = document.createElement('p');
        description.textContent = dataEntry.description;

        // Append all created elements to the card container
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(name);
        if (dataEntry.date) {
            card.appendChild(dateLocation);
        }
        card.appendChild(description);
        card.appendChild(button);

        // Append the card to the container
        container.appendChild(card);
    });
}

createCard(eventsData, 'events');