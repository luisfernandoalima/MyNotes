// Muda a visualização do input de senha
class PasswordVisibility {
  constructor(input, iconButton) {
    (this.input = document.querySelector(input)),
      (this.iconButton = document.querySelector(iconButton));
  }

  initializeChangeVisibility() {
    this.iconButton.addEventListener("click", () => {
      if (this.iconButton.classList.contains("fa-eye")) {
        this.iconButton.classList.remove("fa-eye");
        this.iconButton.classList.add("fa-eye-slash");
        this.input.type = "text";
      } else {
        this.iconButton.classList.add("fa-eye");
        this.iconButton.classList.remove("fa-eye-slash");
        this.input.type = "password";
      }
    });
  }
}

export default PasswordVisibility;
