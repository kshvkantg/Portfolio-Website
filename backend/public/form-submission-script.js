const BASE_URL = import.meta.env.VITE_API_BASE_URL;

document.addEventListener('alpine:init', () => {
    Alpine.data('sendContactForm', () => ({
        fullName: '', // Clear initial value
        contact: '', // Clear initial value
        subject: '', // Clear initial value
        message: '', // Clear initial value
        isLoading: false, // Loading state for button,

        resetForm() {
            this.fullName = '';
            this.contact = '';
            this.subject = '';
            this.message = '';
        },

        getBaseUrl() {
            console.log(BASE_URL); // Log BASE_URL only for debugging purposes
        }
    }));
});

document.addEventListener('DOMContentLoaded', () => {
    const openPopup = document.getElementById('openPopup');
    const closePopup = document.getElementById('closePopup');
    const formOverlay = document.getElementById('formOverlay');
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const buttonText = document.getElementById('buttonText');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const submitError = document.getElementById('submitError');

    // Function to toggle the popup
    const togglePopup = (show) => {
        formOverlay.classList.toggle('hidden', !show);
    };

    // Open popup
    openPopup.addEventListener('click', () => {
        togglePopup(true);
    });

    // Close popup
    closePopup.addEventListener('click', () => {
        togglePopup(false);
    });

    // Handle form submission
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Show loading spinner
        loadingSpinner.classList.remove('hidden');
        buttonText.classList.add('hidden');
        submitError.classList.add('hidden'); // Hide error message

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            contact: document.getElementById('contact').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
        };

        try {
            // Simulate an API call (replace this with your actual API endpoint)
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                // Upon success, close the popup
                alert('Your message has been sent successfully!');
                togglePopup(false);
            } else {
                // Show error message
                submitError.textContent = `Error: ${result.message || 'Failed to submit your message.'}`;
                submitError.classList.remove('hidden');
            }
        } catch (error) {
            // Show network error message
            submitError.textContent = 'Network error: Unable to send your message.';
            submitError.classList.remove('hidden');
        }

        // Stop loading spinner
        loadingSpinner.classList.add('hidden');
        buttonText.classList.remove('hidden');
    });
});
