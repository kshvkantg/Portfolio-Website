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