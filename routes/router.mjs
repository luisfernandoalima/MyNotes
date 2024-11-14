import express from "express";
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin", { titulo: "Cadastre-se", css: "signin.css", js: "signin.mjs" });
});

router.get("/login", (req, res) => {
  res.render("login", { titulo: "Login", css: "login.css", js: "login.mjs" });
});

export default router;
