document.getElementById("forgotForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const form = this;
  const email = form.email.value;
  const emailError = document.getElementById("femailerr");
  const formError = document.getElementById("formError");

  // Clear previous error messages
  emailError.innerHTML = "";
  formError.innerHTML = "";
  let isFormValid = true;

  // Simple email format validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Check if email is empty
  if (email.trim() === "") {
      emailError.innerHTML = "Email is required.";
      isFormValid = false;
  } else if (!emailPattern.test(email)) {
      // If the email format is invalid
      alert("Please enter a valid email address."); // Show warning box
      isFormValid = false;
  }

  if (isFormValid) {
      // Send AJAX request to PHP script if validation is successful
      fetch('../controller/forgotAction.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ email: email })
      })
      .then(response => response.json())
      .then(data => {
          if (!data.success) {
              formError.innerHTML = data.message; // Display server-side error message
          } else {
              formError.style.color = "green"; // Change text color to green
              formError.innerHTML = data.message; // Display success message
          }
      })
      .catch(error => {
          formError.innerHTML = "An error occurred. Please try again.";
          console.error('Error:', error);
      });
  }
});
