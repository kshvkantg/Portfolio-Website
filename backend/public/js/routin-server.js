import { config } from "./config.js";
document.addEventListener("DOMContentLoaded", function () {

    const BASE_URL = config.FRONT_APP_BASE_URL

    document.getElementById("adminPanel").addEventListener("click", function () {
        const route = "/api/query";
        window.location.href = `${BASE_URL}${route}`;
    });


    window.onpopstate = function () {
        location.reload();
    };

    const resumeButton = document.getElementById("resumeButton");
    resumeButton.addEventListener("click", async () => downloadPdfResume(
        `${BASE_URL}/api/pdf`,
        {}
    ));

    async function downloadPdfResume(endpoint, data) {
        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/pdf",
                }
            });

            await createLinkAndDownloadPdf(response);
            console.log("API Response:", result)
            window.location.replace(window.location.pathname);
        } catch (error) {
            console.error("API Error:", error.message);
            throw error;
        }
    }

    async function createLinkAndDownloadPdf(response) {
        try {
            const blob = await response.blob();

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("API Error:", error.message);
            throw error;
        }
    }
});

