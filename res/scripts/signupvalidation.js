document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const passwordInput = document.getElementById("signup-password");
  const errorEl = document.getElementById("password-error");

  if (!form || !passwordInput || !errorEl) return;

  function validatePassword(pw) {
    const errors = [];

    // 1) len 8-14
    if (pw.length < 8 || pw.length >= 15) {
      errors.push("The password should be at least 8 characters and less than 15 characters");
    }

    // 2) Starts with uppercase
    if (!/^[A-Z]/.test(pw)) {
      errors.push("It should start with an uppercase alphabet");
    }

    // 3) Includes at least one uppercase alphabet character
    if (!/[A-Z]/.test(pw)) {
      errors.push("Includes at least one uppercase alphabet character");
    }

    // 4) Includes at least two lowercase alphabet characters
    const lowers = pw.match(/[a-z]/g) || [];
    if (lowers.length < 2) {
      errors.push("Includes at least two lowercase alphabet characters");
    }

    // 5) Includes at least one numeric value
    if (!/\d/.test(pw)) {
      errors.push("Includes at least one numeric value");
    }

    // 6) Includes "_"
    if (!/_/.test(pw)) {
      errors.push('It should include the character "_"');
    }

    return errors;
  }

  function showErrors(errors) {
    if (!errors.length) {
      errorEl.style.display = "none";
      errorEl.textContent = "";
    } else {
      errorEl.style.display = "block";
      errorEl.textContent =
        "The password is not valid - " + errors.join(", ");
    }
  }

  passwordInput.addEventListener("input", () => {
    const errors = validatePassword(passwordInput.value);
    showErrors(errors);
  });

  form.addEventListener("submit", (e) => {
    const errors = validatePassword(passwordInput.value);
    if (errors.length) {
      e.preventDefault();
      showErrors(errors);
    }
  });
});
