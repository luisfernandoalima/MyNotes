import express from "express";
const router = express.Router();
import { User } from "../models/User.mjs";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import passport from "passport";
import { configureAuth } from "../config/auth.mjs";
configureAuth(passport);

router.get("/signin", (req, res) => {
  res.render("signin", {
    titulo: "Cadastre-se",
    css: "signin.css",
    js: "signin.mjs",
    alert: req.query.alert || null,
  });
});

router.post("/signin", (req, res) => {
  User.findOne({ email_user: req.body.signinEmail })
    .then((user) => {
      if (user) {
        res.redirect("/signin?alert=O e-mail já está sendo utilizado.");
      } else {
        const newUser = {
          name_user: req.body.signinName,
          email_user: req.body.signinEmail,
          password_user: req.body.signinPassword,
        };

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password_user, salt, (err, hash) => {
            if (err) {
              console.log(`Erro ao criar o salt: ${err}`);
              res.redirect("/");
            }
            newUser.password_user = hash;
            new User(newUser)
              .save()
              .then(() => {
                console.log("Salvo com sucesso!");
                res.redirect("/");
              })
              .catch((err) => {
                console.log(`Erro ao salvar: ${err}`);
                res.redirect("/");
              });
          });
        });
      }
    })
    .catch((err) => {
      console.log(`Erro: ${err}`);
    });
});

router.get("/login", (req, res) => {
  res.render("login", {
    titulo: "Login",
    css: "login.css",
    js: "login.mjs",
    alert: req.query.alert || null,
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false,
  })(req, res, next);
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
    js: "canceledNotes.mjs",
  });
});

router.get("/profile", (req, res) => {
  res.render("profile", {
    titulo: "MyNotes - Meu Perfil",
    css: "profile.css",
    js: "profile.mjs",
  });
});

router.get("/edit-profile", (req, res) => {
  res.render("editProfile", {
    titulo: "MyNotes - Editar Perfil",
    css: "editProfile.css",
    js: "editProfile.mjs",
  });
});

router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
  });

  res.redirect("/login");
});

export default router;
