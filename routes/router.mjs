import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { titulo: "Login", css: "login.css" });
});

router.get("/login", (req, res) => {
  res.render("login", { titulo: "Login", css: "login.css", js: "login.mjs" });
});

export default router;
