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

Toastify.toastError("Olá!");

import ValidateForms from "./class/ValidateForms.mjs";

const formsValidation = new ValidateForms(".btnSubmit");

const btnSubmit = document.querySelector(".btnSubmit");

btnSubmit.addEventListener("mouseover", () => {
  if (btnSubmit.disabled === true) {
    let errorMessage = formsValidation.checkErrors();

    if (errorMessage != false) {
      errorMessage.forEach((error) => {
        Toastify.toastError(error);
      });
    }
  }
});

setInterval(formsValidation.checkInputs, 500);
