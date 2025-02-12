document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('response-msg');
    const closeModal = document.querySelector('.close');
    const loader = document.getElementById('loader-overlay');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form from reloading the page

        // Show the loader
        loader.style.display = 'flex';

        // Collect form data
        let formData = new FormData(form);

        fetch('./bat/contact.php', { 
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) 
        .then(data => {
            // Hide the loader
            loader.style.display = 'none';

            // Show response message in the modal
            document.getElementById('msg-message').innerHTML = data;
            modal.style.display = 'flex';
        })
        .catch(error => {
            console.error('Error:', error);
            loader.style.display = 'none';
            document.getElementById('msg-message').innerHTML = 'An error occurred. Please try again.';
            modal.style.display = 'flex';
        });
    });

    // Close the modal when the "X" button is clicked
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
