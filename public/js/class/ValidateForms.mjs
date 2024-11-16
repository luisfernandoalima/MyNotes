class ValidateForms {
  constructor(btnSubmit) {
    this.btnSubmit = document.querySelector(btnSubmit);
  }

  checkPassword =() =>{
    
  }

  checkErrors = () => {
    let inputs = document.querySelectorAll("input");
    let errorCount = 0;
    let errorMessage = [];

    inputs.forEach((input) => {
      if (
        input.value == "" ||
        input.value == null ||
        input.value == undefined
      ) {
        errorCount += 1;
      }
    });
    if (errorCount >= 1) {
      errorMessage.push("Os campos devem estar preenchidos");
      errorCount = 0;
    }

    let inputPassword = document.querySelector("#signinPassword");
    let inputRepeatPassword = document.querySelector("#signinRepeatPassword");

    if (inputPassword.value != inputRepeatPassword.value) {
      errorMessage.push("As senhas devem ser iguais");
    } else if (inputPassword.value == "") {
      errorMessage.push("Você deve possuir uma senha");
    }

    if (errorMessage.length > 0) {
      return errorMessage;
    } else {
      return false;
    }
  };

  checkInputs = () => {
    let inputs = document.querySelectorAll("input");
    let errorCount = 0;

    inputs.forEach((input) => {
      if (
        input.value == "" ||
        input.value == null ||
        input.value == undefined
      ) {
        errorCount += 1;
      }
    });

    let inputPassword = document.querySelector("#signinPassword");
    let repeatInputPassword = document.querySelector("#signinRepeatPassword");

    if (inputPassword.value != repeatInputPassword.value) {
      errorCount += 1;
    }

    if (errorCount == 0) {
      this.btnSubmit.disabled = false;
    } else {
      this.btnSubmit.disabled = true;
    }
  };
}

export default ValidateForms;
