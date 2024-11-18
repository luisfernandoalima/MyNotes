import express from "express";
const router = express.Router();

router.get("/signin", (req, res) => {
  res.render("signin", {
    titulo: "Cadastre-se",
    css: "signin.css",
    js: "signin.mjs",
  });
});

router.get("/login", (req, res) => {
  res.render("login", { titulo: "Login", css: "login.css", js: "login.mjs" });
});

router.get("/", (req, res) => {
  res.render("index", {
    titulo: "MyNotes - Página Inicial",
    css: "paginaInicial.css",
    js: "paginaInicial.mjs",
  });
});

router.get("/new-note", (req, res) => {
  res.render("newNote", {
    titulo: "MyNotes - Nova Nota",
    css: "newNote.css",
    js: "newNote.mjs",
  });
});

router.get("/completed-notes", (req, res) => {
  res.render("completedNotes", {
    titulo: "MyNotes - Notas Concluídas",
    css: "completedNotes.css",
    js: "completedNotes.mjs",
  });
});

router.get("/canceled-notes", (req, res) => {
  res.render("canceledNotes", {
    titulo: "MyNotes - Notas Canceladas",
    css: "canceledNotes.css",
    js: "canceledNotes.mjs" 
  })
})

export default router;
