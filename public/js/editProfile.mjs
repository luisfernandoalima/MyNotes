const uploadInput = document.querySelector("#userImage");
const imageTag = document.querySelector("#userPicture");
const imageText = document.querySelector(".userImageText")
uploadInput.addEventListener("change", () => {
  const file = event.target.files[0];
  imageTag.src = URL.createObjectURL(file);

  imageText.textContent = uploadInput.files[0].name
});

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

  if (inputs[4].value == "") {
    errorMessage.push("Preencha o campo senha!");
  } else {
    if (inputs[4].value != inputs[5].value) {
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