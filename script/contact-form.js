document.querySelector('.contact-us').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value;
    const number = document.getElementById('number').value;
    const reason = document.getElementById('reason').value;
    const moreInfo = document.getElementById('more-info').value;

    // Create a contact object
    const contactData = {
      name: name,
      email: email,
      company: company,
      number: number,
      reason: reason,
      moreInfo: moreInfo
    };

    localStorage.setItem('contactData', JSON.stringify(contactData));

    alert('Thank you for your message, ' + name + '. We aim to respond to all inquiries within 5 working days');

    this.reset();
  });