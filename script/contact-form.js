document.querySelector('.contact-us').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form data from input fields
  const name = document.getElementById('name').value; // Retrieve the user's name
  const email = document.getElementById('email').value; // Retrieve the user's email address
  const company = document.getElementById('company').value; // Retrieve the user's company name
  const number = document.getElementById('number').value; // Retrieve the user's contact number
  const reason = document.getElementById('reason').value; // Retrieve the reason for contact
  const moreInfo = document.getElementById('more-info').value; // Retrieve any additional information provided by the user

  // Create an object to store the contact data
  const contactData = {
    name: name,
    email: email,
    company: company,
    number: number,
    reason: reason,
    moreInfo: moreInfo
  };

  // Save the contact data object to local storage as a JSON string
  localStorage.setItem('contactData', JSON.stringify(contactData));

  // Provide feedback to the user confirming their message was received
  alert('Thank you for your message, ' + name + '. We aim to respond to all inquiries within 5 working days');

  // Reset the form after submission
  this.reset();
});