import PasswordVisibility from "./class/PasswordVisibility.mjs";

const inputPasswordVisibility = new PasswordVisibility(
  "#signinPassword",
  ".passwordViewButton"
).initializeChangeVisibility();

const inputRepeatPasswordVisibility = new PasswordVisibility(
  "#signinRepeatPassword",
  ".repeatPpasswordViewButton"
).initializeChangeVisibility();

import CreateToastify from "./class/Toastify.mjs";

const Toastify = new CreateToastify();

const btnSubmit = document.querySelector(".btnSubmit");

const checkErrors = () => {
  const inputs = document.querySelectorAll("input");
  let hasError = false;
  let errorMessage = [];

  inputs.forEach((input) => {
    if (input.value == null || input.value == undefined || input.value == "") {
      hasError = true;
    }
  });

  if (hasError) {
    errorMessage.push("Os campos devem estar preenchidos!");
  }

  hasError = false;

  if (inputs[2].value == "") {
    errorMessage.push("Preencha o campo senha!");
  } else {
    if (inputs[2].value != inputs[3].value) {
      errorMessage.push("As senhas devem ser iguais!");
    }
  }
  if (errorMessage.length > 0) {
    btnSubmit.disabled = true;
    return errorMessage;
  } else {
    btnSubmit.disabled = false;
  }
};

btnSubmit.addEventListener("mouseover", () => {
  if (btnSubmit.disabled === true) {
    let errorMessage = checkErrors();

    if (errorMessage != false) {
      errorMessage.forEach((error) => {
        Toastify.toastError(error);
      });
    }
  }
});

setInterval(checkErrors, 100);
