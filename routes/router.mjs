import express from "express";
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin", { titulo: "Cadastre-se", css: "signin.css", js: "signin.mjs" });
});

router.get("/login", (req, res) => {
  res.render("login", { titulo: "Login", css: "login.css", js: "login.mjs" });
});

router.get("/", (req, res) => {
  res.render("index", {titulo: "MyNotes - Página Inicial", css: "paginaInicial.css", js: "paginaInicial.mjs"})
})

router.get("/new-note", (re1, res) => {
  res.render("newNote", {titulo: "MyNotes - Nova Nota", css: 'newNote.css', js: "newNote.mjs"})
})

export default router;
