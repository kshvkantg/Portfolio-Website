import { config } from "./config.js";
document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("popup");
    const openPopupBtn = document.getElementById("openPopupBtn");
    const closePopup = document.getElementById("closePopup");
    const submitButton = document.getElementById("submitButton");
    const buttonText = document.getElementById("buttonText");
    const submitError = document.getElementById("submitError");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const resumeButton = document.getElementById("resumeButton");
    //////////////////////////////////////////
    const fullName = document.getElementById("name");
    const contact = document.getElementById("contact");
    const message = document.getElementById("message");
    const subject = document.getElementById("subject");

    const BASE_URL = config.FRONT_APP_BASE_URL


    function openPopup() {
        popup.classList.remove("hidden");
    }

    function closePopupHandler() {
        popup.classList.add("hidden");
    }

    openPopupBtn.addEventListener("click", openPopup);
    closePopup.addEventListener("click", closePopupHandler);

    submitButton.addEventListener("click",async() =>  callSubmitRequestApi(
        `${BASE_URL}/api/query`,
        {
            full_name : `${fullName.value}`,
            contact : `${contact.value}`,
            subject : `${subject.value}`,
            message : `${message.value}`,
        }))

    async function callSubmitRequestApi(endpoint, data = {}) {
        initializeLoadingButtonBehaviour()
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },body : JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log("API Response:", result);
            window.location.replace(window.location.pathname);
            return result;
        } catch (error) {
            destroyLoadingButtonBehaviour()
            console.error("API Error:", error.message);
            throw error;
        }
    }

    function initializeLoadingButtonBehaviour(){
        buttonText.innerHTML = "Fetching data...";
        submitButton.disabled = true;
        loadingSpinner.classList.remove("hidden");
        resumeButton.innerHTML = "Fetching data...";
    }

    function destroyLoadingButtonBehaviour(){
        buttonText.innerHTML = `Submit`;
        loadingSpinner.classList.add("hidden");
        submitButton.disabled = false;
    }
});
