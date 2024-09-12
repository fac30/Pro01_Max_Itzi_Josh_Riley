document.querySelector('.newsletter-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the value of the email input field
  const newsletterEmail = document.getElementById('newsletter-input').value;

  // Store the email address in local storage
  localStorage.setItem('newsletterEmail', newsletterEmail);

  // Show an alert to the user confirming their subscription
  alert('Thank you for subscribing!');

  // Reset the form after submission
  this.reset();
});
