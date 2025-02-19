const regexPatterns = {
  namePattern: /^[A-Za-z\s]{2,}$/,
  emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phonePattern: /^\+?[1-9]\d{1,14}$/,
};

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = event.target;

  const nameValue = formData.name.value;

  console.log(nameValue);
  console.log("Form submitted!");
  let isFormCorrect = true;

  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  nameError.innerText = "";

  if (nameInput.value.trim().length < 2) {
    isFormCorrect = false;
    nameError.innerText = "Name should contain at least 2 characters.";
  } else if (!regexPatterns.namePattern.test(nameInput.value.trim())) {
    isFormCorrect = false;
    nameError.innerText = "Name should only contain letters.";
  }

  const surnameInput = document.getElementById("surname");
  const surnameError = document.getElementById("surnameError");
  surnameError.innerText = "";  

  if (surnameInput.value.trim().length < 2) {
    isFormCorrect = false;
    surnameError.innerText = "Surname should contain at least 2 characters";
  } else if (!regexPatterns.namePattern.test(surnameInput.value)) {
    isFormCorrect = false;
    surnameError.innerText = "Surname should only contain letters.";
  }

  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  emailError.innerText = "";

  if (emailInput.value.trim().length < 1) {
    isFormCorrect = false;
    emailError.innerText = "Email is required";
  } else if (!regexPatterns.emailPattern.test(emailInput.value)) {
    isFormCorrect = false;
    emailError.innerText = "Email should suit following standard: john@gmail.com.";
  }

  const ageInput = document.getElementById("age");
  const ageError = document.getElementById("ageError");
  ageError.innerText = "";
  const ageInteger = parseInt(ageInput.value);

  if (isNaN(ageInteger)) {
    isFormCorrect = false;
    ageError.innerText = "Age should be a number";
  } else if (ageInteger < 0 || ageInteger > 120) {
    isFormCorrect = false;
    ageError.innerText = "Age should be between 0 and 120";
  }

  const phoneInput = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");
  phoneError.innerText = "";

  if (phoneInput.value.trim().length < 1) {
    isFormCorrect = false;
    phoneError.innerText = "Phone is required";
  } else if (!regexPatterns.phonePattern.test(phoneInput.value)) {
    isFormCorrect = false;
    phoneError.innerText = "Phone should be in the following format: +905359857598";
  }

  console.log('Is form correct?', isFormCorrect);
  document.getElementById('formSubmitSuccess').innerText= 'Form submitted succesfully!';

});
