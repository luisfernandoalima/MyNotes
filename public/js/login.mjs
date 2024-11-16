import PasswordVisibility from "./class/PasswordVisibility.mjs";
const inputPassword = new PasswordVisibility(
  "#loginPassword",
  ".passwordViewButton"
).initializeChangeVisibility();

import CreateToastify from "./class/Toastify.mjs";

const Toastify = new CreateToastify

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

  if (errorMessage.length > 0) {
    btnSubmit.disabled = true
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

setInterval(checkErrors, 500);
