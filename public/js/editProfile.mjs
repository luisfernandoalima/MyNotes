import PasswordVisibility from "./class/PasswordVisibility.mjs";

const CreatePasswordVisibility = new PasswordVisibility('#userPasswordInput', '.passwordViewButton').initializeChangeVisibility()

const CreateRepeatPasswordVisibility = new PasswordVisibility('#userRepeatPasswordInput','.repeatPasswordViewButton').initializeChangeVisibility()

import CreateToastify from "./class/Toastify.mjs";

const Toastify = new CreateToastify

const btnSubmit = document.querySelector(".btn-submit");

const checkErrors = () => {
  const inputs = document.querySelectorAll("input");
  let hasError = false;
  let errorMessage = [];

  if (inputs[3].value == "") {
    errorMessage.push("Preencha o campo senha!");
  } else {
    if (inputs[3].value != inputs[4].value) {
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