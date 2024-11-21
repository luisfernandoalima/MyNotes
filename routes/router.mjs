import express from "express";
const router = express.Router();
import { User } from "../models/User.mjs";
import { Note } from "../models/Note.mjs";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import passport from "passport";
import auth from '../config/auth.mjs'
auth(passport);

import isLogged from "../helpers/isLogged.mjs";

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
    successRedirect: "/?congrats=Bem vindo!",
    failureRedirect: "/login?alert=Senha incorreta!",
    failureFlash: false,
  })(req, res, next);
});

router.get("/",isLogged, (req, res) => {
  Note.find({creator_note: req.user.id, status_note: "Open"}).sort({creationDate_note: 'desc'}).then((nota) => {
    res.render("index", {
      titulo: "MyNotes - Página Inicial",
      css: "paginaInicial.css",
      js: "paginaInicial.mjs",
      congrats: req.query.congrats || null,
      notes: nota
    });
  })


});

router.get("/new-note", isLogged, (req, res) => {
  res.render("newNote", {
    titulo: "MyNotes - Nova Nota",
    css: "newNote.css",
    js: "newNote.mjs",
    alert: req.query.alert || null
  });
});

router.post("/new-note", isLogged, (req, res) => {
  const newNote = {
    title_note: req.body.noteTitulo,
    tag_note: req.body.noteTag,
    content_note: req.body.noteContent,
    finishDate_note: req.body.noteDate,
    creator_note: req.user.id
  }

  new Note(newNote).save().then(() => {
    res.redirect("/?congrats=Nota criada com sucesso!")
  }).catch((err) => {
    res.redirect("/new-note?alert=Erro ao criar a nota!")
  })
})

router.get("/cancel-note/:id",isLogged, (req, res) => {
  Note.findOne({_id: req.params.id}).then((note) => {
      note.status_note = "Canceled"

      note.save().then(()=> {
        res.redirect("/?alert=Nota cancelada com sucesso")
      }).catch((err)=>{
        res.redirect("/?alert=Erro ao cancelar a nota!")
      })
  }).catch((err) => {
    res.redirect("/?alert=Erro ao encontrar a nota!")
  })
})

router.get("/completed-notes", isLogged, (req, res) => {
  res.render("completedNotes", {
    titulo: "MyNotes - Notas Concluídas",
    css: "completedNotes.css",
    js: "completedNotes.mjs",
  });
});

router.get("/canceled-notes", isLogged, (req, res) => {
  res.render("canceledNotes", {
    titulo: "MyNotes - Notas Canceladas",
    css: "canceledNotes.css",
    js: "canceledNotes.mjs",
  });
});

router.get("/profile", isLogged, (req, res) => {
  res.render("profile", {
    titulo: "MyNotes - Meu Perfil",
    css: "profile.css",
    js: "profile.mjs",
  });
});

router.get("/edit-profile", isLogged, (req, res) => {
  res.render("editProfile", {
    titulo: "MyNotes - Editar Perfil",
    css: "editProfile.css",
    js: "editProfile.mjs",
  });
});

router.get("/logout", isLogged, (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
  });

  res.redirect("/login");
});

export default router;
