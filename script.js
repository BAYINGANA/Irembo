document.getElementById("importPermitForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById("full_name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        businessType: document.getElementById("business_type").value,
        citizenship: document.getElementById("citizenship").value,
    };

    try {
        const response = await fetch("http://localhost:5000/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error("Failed to submit the form");
        }

        const result = await response.json();
        alert(result.message); // Show success message
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form.");
    }
});
