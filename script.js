document.addEventListener("DOMContentLoaded", function () {
    // Get form elements
    const form = document.getElementById("importPermitForm");
    if (!form) {
      console.error("Form not found!");
      return;
    }
  
    const citizenshipSelect = document.getElementById("citizenship");
    const importPurposeSelect = document.getElementById("import_purpose");
    const loadingOverlay = document.createElement("div");
    loadingOverlay.id = "loadingOverlay";
    loadingOverlay.classList.add("hidden");
    document.body.appendChild(loadingOverlay);
  
    const idNumberContainer = document.getElementById("idNumberField");
    const passportContainer = document.getElementById("passportField");
    const idNumberInput = document.getElementById("id_number");
    const passportInput = document.getElementById("passport_number");
    const otherPurposeField = document.getElementById("otherPurposeField");
    const otherPurposeInput = document.getElementById("other_purpose");
  
    // Helper function to show notifications
    function showNotification(message, isSuccess = true) {
      alert(message);
    }
  
    // Handle import purpose selection
    if (importPurposeSelect) {
      importPurposeSelect.addEventListener("change", function () {
        if (this.value === "other") {
          otherPurposeField.classList.remove("hidden");
          otherPurposeInput.required = true;
        } else {
          otherPurposeField.classList.add("hidden");
          otherPurposeInput.required = false;
          otherPurposeInput.value = "";
        }
      });
    }
  
    // Handle citizenship selection
    if (citizenshipSelect) {
      citizenshipSelect.addEventListener("change", function () {
        if (this.value === "rwandan") {
          idNumberContainer.classList.remove("hidden");
          passportContainer.classList.add("hidden");
          idNumberInput.required = true;
          passportInput.required = false;
          passportInput.value = "";
        } else if (this.value === "foreigner") {
          idNumberContainer.classList.add("hidden");
          passportContainer.classList.remove("hidden");
          idNumberInput.required = false;
          passportInput.required = true;
          idNumberInput.value = "";
        } else {
          idNumberContainer.classList.add("hidden");
          passportContainer.classList.add("hidden");
          idNumberInput.required = false;
          passportInput.required = false;
          idNumberInput.value = "";
          passportInput.value = "";
        }
      });
    }
  
    // Form submission
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log("Form submitted");
  
      try {
        // Basic validation
        const email = form.elements["email"].value;
        const phone = form.elements["phone"].value;
        const tinNumber = form.elements["tin"].value;
        const citizenship = form.elements["citizenship"].value;
  
        if (!email) {
          showNotification("Please enter an email address", false);
          return;
        }
  
        if (!phone || phone.length !== 9) {
          showNotification("Please enter a valid 9-digit phone number", false);
          return;
        }
  
        if (!tinNumber || tinNumber.length !== 9) {
          showNotification("Please enter a valid 9-digit TIN number", false);
          return;
        }
  
        // Add ID validation
        if (citizenship === "rwandan") {
          const idNumber = form.elements["id_number"].value;
          if (!idNumber || idNumber.length !== 16 || !/^[0-9]+$/.test(idNumber)) {
            showNotification("Please enter a valid 16-digit National ID number", false);
            return;
          }
        } else if (citizenship === "foreigner") {
          const passport = form.elements["passport_number"].value;
          if (!passport) {
            showNotification("Please enter a valid Passport number", false);
            return;
          }
        }
  
        // Collect form data
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        console.log("Form data:", formObject);
  
        // Show loading overlay
        loadingOverlay.classList.remove("hidden");
  
        // Send data to backend
        const response = await fetch("http://localhost:5000/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formObject),
        });
  
        const result = await response.json();
        showNotification(result.message, true);
        form.reset();
      } catch (error) {
        console.error("Submission failed:", error);
        showNotification("Failed to submit application. Please try again.", false);
      } finally {
        loadingOverlay.classList.add("hidden");
      }
    });
  });
  