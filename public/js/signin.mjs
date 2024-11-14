import PasswordVisibility from "./class/PasswordVisibility.mjs";

const inputPasswordVisibility = new PasswordVisibility("#signinPassword", ".passwordViewButton").initializeChangeVisibility()

const inputRepeatPasswordVisibility = new PasswordVisibility("#signinRepeatPassword", ".repeatPpasswordViewButton").initializeChangeVisibility()

import CreateToastify from "./class/Toastify.mjs";

const Toastify = new CreateToastify

Toastify.toastError("Olá!")