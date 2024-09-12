## JavaScript Documentation

### 1. **Fetch and Create Event/Team Cards**

#### **Function: `fetchData(type)`**

This function fetches JSON data for a specified type (`events` or `team`) and calls another function (`createCard`) to dynamically generate HTML content.

```javascript
// Function to fetch JSON data and create event or team cards
async function fetchData(type) {
    try {
        // Fetch the JSON data
        const response = await fetch(`../data/${type}.json`);
        const data = await response.json(); // Parse the JSON data

        // Call the function to create cards
        createCard(data, type);
    } catch (error) {
        console.error('Error fetching data:', error); // Log errors if any
    }
}
```

- **Parameters:**
  - `type` (string): Specifies the type of data to fetch (`'events'` or `'team'`).

- **Fetches JSON Data**: Retrieves data from a JSON file located at `../data/{type}.json` and parses it.

- **Calls `createCard`**: Passes the parsed data to the `createCard` function for rendering on the webpage.

---

### 2. **Create Cards for Events or Team Members**

#### **Function: `createCard(data, type)`**

This function dynamically creates HTML elements for each event or team member and appends them to their respective containers on the webpage.

```javascript
function createCard(data, type) {
    const isEvent = (type === "events"); // Determine if the data type is 'events'
    const container = document.querySelector(`.${type}-container`); // Select the container div
```

- **Type Check**: Checks whether the data is for events or team members.

- **Selects Container**: Selects the HTML container element where the generated content will be inserted.

#### **Looping through Data and Creating Elements:**

```javascript
    // Loop through the data array to create a card for each entry
    data.forEach(dataEntry => {
        const card = document.createElement('div');
        card.className = `${type}-card`; // Set the card class based on the type
```

- **Loop through Data**: Iterates over each entry in the `data` array, creating a new card for each event or team member.

- **Create Card Container**: Creates a `div` element to serve as the main card container, with a class name (`type-card`) that reflects the type (`events-card` or `team-card`).

#### **Creating Individual Elements for Each Card:**

```javascript
        // Create and set the image element
        const img = document.createElement('img');
        img.src = dataEntry.img; // Set the image source
        img.alt = `Image of ${dataEntry.name}`; // Set the image alt text

        // Create and set the title element
        const title = document.createElement('h3');
        title.className = `${type}-title`;
        title.textContent = dataEntry.title; // Set the title text

        // Create and set the speaker or team member name element
        const name = document.createElement('h2');
        name.className = `${type}-name`;
        name.textContent = dataEntry.name; // Set the name text
```

- **Create Image Element**: An `img` element is created to display the image for the event or team member, with its `src` and `alt` attributes set based on the data.

- **Create Title Element**: An `h3` element is created for the event or team member's title, with its text content set from the data.

- **Create Name Element**: An `h2` element is created for the name of the speaker or team member, with its text content set from the data.

#### **Handling Event-Specific Elements:**

```javascript
        let dateLocation;
        let button;
        let descriptionDiv;
        
        if (isEvent) {
            // Create and format the date and location element
            dateLocation = document.createElement('h4');
            dateLocation.className = `${type}-date`;
            const eventDate = new Date(dataEntry.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' 
            });
            dateLocation.textContent = `${formattedDate} - `;
```

- **Event-Specific Elements**:
  - **Date and Location**: Creates an `h4` element to display the event date and location, formatted to be more readable.
  - **Formatting Date**: The `Date` object is used to parse the date, and `toLocaleDateString` formats it for display.

```javascript
            // Create and set the location link
            const locationUrl = document.createElement('a');
            locationUrl.href = dataEntry.locationUrl;
            locationUrl.textContent = dataEntry.location;
            locationUrl.target = '_blank'; // Open the link in a new tab

            // Append the location link to the dateLocation element
            dateLocation.appendChild(locationUrl);

            // Create and set the button element
            button = document.createElement('button');
            button.className = `${type}-button`;
            button.textContent = 'Buy Tickets';
        } else {
            descriptionDiv = document.createElement('div');
            descriptionDiv.className = `${type}-descriptionDiv`;
        }
```

- **Location Link**: An `a` element is created and appended to the `dateLocation` element to provide a clickable link to the event location on Google Maps.
- **Buy Tickets Button**: A `button` element is created for events, allowing users to initiate a ticket purchase.

#### **Appending Elements to the Card Container:**

```javascript
        // Create and set the description paragraph
        const description = document.createElement('p');
        description.className = `${type}-description`;
        description.textContent = dataEntry.description; // Set the description text

        // Append elements to the card
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

        container.appendChild(card); // Append the card to the container
    });
}
```

- **Description Element**: A `p` element is created to display the description text for the event or team member.

- **Appending Elements**:
  - **To the Card**: Elements such as the image, title, name, date, location link, and description are appended to the `card` div.
  - **To a Sub-Container (if needed)**: For team data, a sub-container (`descriptionDiv`) is used to group elements before appending them to the card.
  - **To the Main Container**: Finally, the completed `card` is appended to the main container (`.events-container` or `.team-container`), which is selected based on the type.

---

### 3. How the DOM Elements Get Appended to the Container

1. **Main Container Selection**:
   - The script first selects the main container based on the type of data (either `.events-container` or `.team-container`).

2. **Card Creation**:
   - A new `div` element (`card`) is created for each entry in the data array. This serves as the individual container for that event or team member's content.

3. **Appending Elements to the Card**:
   - All elements (image, title, name, etc.) are created dynamically and appended to the `card` div.
   - Event-specific elements, such as the formatted date and location link, are created only for event data and added to the card.

4. **Appending the Card to the Main Container**:
   - After all elements are added to the `card`, the script appends the entire `card` div to the main container (`.events-container` or `.team-container`).

### Example of How It Appears in the HTML

If your HTML contains the following containers:

```html
<div class="events-container"></div>
<div class="team-container"></div>
```

After running the script, these containers will be populated with dynamically generated cards:

```html
<div class="events-container">
    <div class="events-card">
        <img src="https://example.com/event-image.jpg" alt="Image of Bill Gates" />
        <h3 class="events-title">How to excel at building and installing windows</h3>
        <h2 class="events-name">Bill Gates</h2>
        <h4 class="events-date">Monday, September 23, 2024, 19:00 - <a href="https://www.google.com/maps/place/SPACE4" target="_blank">Space4, London</a></h4>
        <p class="events-description">Join us for a special talk by Bill Gates...</p>
        <button class="events-button">Buy Tickets</button>
    </div>
    <!-- Additional event cards will follow... -->
</div>

<div class="team-container">
    <div class="team-card">
        <img src="images/itzi.jpg" alt="Image of Itziar Cantero" />
        <div class="team-descriptionDiv">
            <h

3 class="team-title">Co-Founder and COO</h3>
            <h2 class="team-name">Itziar Cantero</h2>
            <p class="team-description">Itzi ensures every event is seamlessly orchestrated...</p>
        </div>
    </div>
    <!-- Additional team member cards will follow... -->
</div>
```

---

### 4. Summary of main

- **Dynamic Content Generation**: Each function dynamically generates HTML elements based on data provided in JSON files, ensuring that the webpage can be easily updated and maintained.
- **Element Creation and Appending**: The functions create individual DOM elements, append them to a card container, and then append the card container to the main container, building the entire structure in the DOM dynamically.
- **Resulting HTML**: The dynamically created elements are inserted into the existing HTML structure, allowing the webpage to display updated content without requiring static HTML modifications.

This detailed approach ensures that the website is flexible, dynamic, and easy to manage, providing a seamless user experience.

---

You're right! Let me add the documentation for the **Contact Form Submission Handler** and **Newsletter Form Submission Handler** functions, with more details about how they create and manage DOM elements.

---

### 5. **Contact Form Submission Handler**

This function manages the submission of the contact form. It prevents the default submission, collects user input, stores it in `localStorage`, and provides feedback to the user.

```javascript
document.querySelector('.contact-us').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
```

- **Event Listener**: Attaches an event listener to the form with the class `.contact-us` that triggers when the form is submitted.
  
- **Prevents Default Submission**: `event.preventDefault()` stops the form from being submitted traditionally, allowing JavaScript to handle the submission process.

```javascript
  // Get form data from input fields
  const name = document.getElementById('name').value; // Retrieve the user's name
  const email = document.getElementById('email').value; // Retrieve the user's email address
  const company = document.getElementById('company').value; // Retrieve the user's company name
  const number = document.getElementById('number').value; // Retrieve the user's contact number
  const reason = document.getElementById('reason').value; // Retrieve the reason for contact
  const moreInfo = document.getElementById('more-info').value; // Retrieve any additional information provided by the user
```

- **Retrieve Form Data**: Uses `document.getElementById` to access each input field by its ID and retrieves the value entered by the user. This includes:
  - `name`, `email`, `company`, `number`, `reason`, and `moreInfo`.

```javascript
  // Create an object to store the contact data
  const contactData = {
    name: name,
    email: email,
    company: company,
    number: number,
    reason: reason,
    moreInfo: moreInfo
  };
```

- **Create Contact Data Object**: Stores the collected data in a JavaScript object named `contactData`, which allows the data to be easily managed and stored.

```javascript
  // Save the contact data object to local storage as a JSON string
  localStorage.setItem('contactData', JSON.stringify(contactData));
```

- **Store Data in `localStorage`**: Converts the `contactData` object to a JSON string using `JSON.stringify()` and saves it to the browser's `localStorage` under the key `'contactData'`.

```javascript
  // Provide feedback to the user confirming their message was received
  alert('Thank you for your message, ' + name + '. We aim to respond to all inquiries within 5 working days');
  
  this.reset(); // Reset the form after submission
});
```

- **User Feedback and Form Reset**:
  - **Alert**: Displays a confirmation message to the user that their message has been received.
  - **Form Reset**: Uses `this.reset()` to clear all input fields, resetting the form for future use.

### **HTML Example for Contact Form**

Make sure your HTML has a contact form that looks like this:

```html
<form class="contact-us">
    <input type="text" id="name" placeholder="Your Name" required>
    <input type="email" id="email" placeholder="Your Email" required>
    <input type="text" id="company" placeholder="Company" required>
    <input type="tel" id="number" placeholder="Phone Number" required>
    <select id="reason">
        <option value="general">General Inquiry</option>
        <option value="booking">Booking</option>
        <option value="feedback">Feedback</option>
    </select>
    <textarea id="more-info" placeholder="Additional Information"></textarea>
    <button type="submit">Submit</button>
</form>
```

- The script dynamically handles the form submission, ensuring user data is collected, stored, and acknowledged efficiently.

---

### 6. **Newsletter Form Submission Handler**

This function manages the submission of the newsletter subscription form. It prevents the default submission, stores the user's email in `localStorage`, and provides feedback.

```javascript
document.querySelector('.newsletter-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior
```

- **Event Listener**: Attaches an event listener to the form with the class `.newsletter-form` that triggers when the form is submitted.

- **Prevents Default Submission**: `event.preventDefault()` stops the form from being submitted traditionally, allowing JavaScript to handle the submission process.

```javascript
  // Get the value of the email input field
  const newsletterEmail = document.getElementById('newsletter-input').value;
```

- **Retrieve Email**: Accesses the input field with the ID `newsletter-input` and retrieves the value entered by the user (the email address).

```javascript
  // Store the email address in local storage
  localStorage.setItem('newsletterEmail', newsletterEmail);
```

- **Store Email in `localStorage`**: Saves the email address to `localStorage` under the key `'newsletterEmail'` to keep a record of the subscription.

```javascript
  alert('Thank you for subscribing!'); // Show an alert to the user confirming their subscription
  
  this.reset(); // Reset the form after submission
});
```

- **User Feedback and Form Reset**:
  - **Alert**: Displays a confirmation message to the user that their subscription was successful.
  - **Form Reset**: Uses `this.reset()` to clear the input field, resetting the form for future use.

### **HTML Example for Newsletter Form**

Ensure your HTML includes a newsletter subscription form like this:

```html
<form class="newsletter-form">
    <input type="email" id="newsletter-input" placeholder="Enter your email" required>
    <button type="submit">Subscribe</button>
</form>
```

- The script handles the form submission dynamically, storing the email locally and providing immediate feedback to the user.

---

### Summary

- **Dynamic Content Generation**: The `fetchData` and `createCard` functions dynamically create HTML content for events and team members based on JSON data, ensuring the webpage is always up-to-date.
  
- **Form Handling**:
  - **Contact Form**: The Contact Form Submission Handler manages user inquiries, storing them in `localStorage` and providing feedback, enhancing user experience and data management.
  - **Newsletter Form**: The Newsletter Form Submission Handler captures user emails for subscription, stores them locally, and provides immediate feedback, facilitating user engagement and retention.

- **User Experience**: Together, these scripts create a dynamic and interactive user experience, allowing The Brainwave Bureau website to effectively manage content and user interactions.