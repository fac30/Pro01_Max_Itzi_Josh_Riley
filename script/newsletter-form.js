document.querySelector('.newsletter-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const newsletterEmail = document.getElementById('newsletter-input').value;

    localStorage.setItem('newsletterEmail', newsletterEmail);

    alert('Thank you for subscribing!');

    this.reset();
  });