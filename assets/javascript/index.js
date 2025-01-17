const slider = document.querySelector('input[type="range"]');
const generateButton = document.querySelector("button");
const upperCaseButton = document.querySelector(
  ".options .form-group:first-child input"
);
const lowerCaseButton = document.querySelector(
  ".options .form-group:nth-child(2) input"
);
const numbersCaseButton = document.querySelector(
  ".options .form-group:nth-child(3) input"
);
const symbolsCaseButton = document.querySelector(
  ".options .form-group:last-child input"
);
const passwordDiv = document.querySelector(".password-value");
const passwordStrength = document.querySelector(
  ".strength-right .heading-small"
);
const rangeValue = document.querySelector(".range-value");
let passwordLength = 10;

slider.addEventListener("input", (event) => {
  const value = event.target.value;
  passwordLength = value;
  rangeValue.innerText = value;
  event.target.style.setProperty("--value", value);

  if (passwordLength < 1) {
    generateButton.disabled = true;
  } else {
    generateButton.disabled = false;
  }
});

const copyButton = document.querySelector(".copy-icon");
const passwordValue = document.querySelector(".password-value");
const copyText = document.querySelector(".copy-text");

copyButton.addEventListener("click", () => {
  const value = passwordValue.innerText;
  copyText.innerText = "Copied";
  navigator.clipboard.writeText(value);

  setTimeout(() => {
    copyText.innerText = "";
  }, 2000);
});

const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

function generatePassword() {
  let availableChars = "";

  if (upperCaseButton.checked) {
    availableChars += upperCaseChars;
  }
  if (lowerCaseButton.checked) {
    availableChars += lowerCaseChars;
  }
  if (numbersCaseButton.checked) {
    availableChars += numberChars;
  }
  if (symbolsCaseButton.checked) {
    availableChars += symbolChars;
  }

  if (!availableChars) {
    passwordDiv.innerText = "Please select at least one option.";
    return;
  }

  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  passwordDiv.innerText = password;
  passwordDiv.classList.remove("password-value-empty");

  checkPasswordStrength(password);
}

function checkPasswordStrength(password) {
  let strength = 0;

  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[!@#$%^&*()_+\[\]{}|;:,.<>?]/.test(password)) strength++;

  const strengthBars = document.querySelectorAll(".strength-bar-fill");
  if (strength === 1) {
    passwordStrength.innerText = "Too weak";
  } else if (strength === 2) {
    passwordStrength.innerText = "Weak";
  } else if (strength === 3) {
    passwordStrength.innerText = "Medium";
  } else {
    passwordStrength.innerText = "Strong";
  }

  strengthBars.forEach((bar, index) => {
    bar.className = "strength-bar-fill";
    if (index < strength) {
      if (strength === 1) {
        bar.classList.add("strength-bar-fill-too-weak");
      } else if (strength === 2) {
        bar.classList.add("strength-bar-fill-weak");
      } else if (strength === 3) {
        bar.classList.add("strength-bar-fill-medium");
      } else if (strength === 4) {
        bar.classList.add("strength-bar-fill-strong");
      }
    }
  });
}

function toggleGenerateButton() {
  const checkboxes = [
    upperCaseButton,
    lowerCaseButton,
    numbersCaseButton,
    symbolsCaseButton,
  ];
  const isAnyChecked = checkboxes.some((checkbox) => checkbox.checked);
  generateButton.disabled = !isAnyChecked;
}

[
  upperCaseButton,
  lowerCaseButton,
  numbersCaseButton,
  symbolsCaseButton,
].forEach((checkbox) => {
  checkbox.addEventListener("change", toggleGenerateButton);
});

generateButton.addEventListener("click", generatePassword);

toggleGenerateButton();
