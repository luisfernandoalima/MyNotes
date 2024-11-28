import express from "express";
const router = express.Router();
import { User } from "../models/User.mjs";
import { Note } from "../models/Note.mjs";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import passport from "passport";
import auth from "../config/auth.mjs";
auth(passport);
import upload from "../helpers/photoUpload.mjs";
import isLogged from "../helpers/isLogged.mjs";
import dateFormat from "../helpers/dateFormat.mjs";

router.get("/signin", (req, res) => {
  res.render("signin", {
    titulo: "Cadastre-se",
    css: "signin.css",
    js: "signin.mjs",
    alert: req.query.alert || null,
    congrats: req.query.congrats || null,
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
              res.redirect("/signin?alert=Erro ao criar a conta");
            }
            newUser.password_user = hash;
            new User(newUser)
              .save()
              .then(() => {
                console.log("Salvo com sucesso!");
                res.redirect("/login?congrats=Conta criada com sucesso!");
              })
              .catch((err) => {
                console.log(`Erro ao salvar: ${err}`);
                res.redirect("/signin?alert=Erro ao criar a conta");
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
    congrats: req.query.congrats || null,
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/?congrats=Bem vindo!",
    failureRedirect: "/login?alert=Senha incorreta!",
    failureFlash: false,
  })(req, res, next);
});

router.get("/", isLogged, (req, res) => {
  let asc = false;
  let desc = false;
  let sortOrder;
  if (req.query.order == "asc") {
    asc = true;
    sortOrder = { creationDate_note: 1 };
  } else if (req.query.order == "desc") {
    desc = true;
    sortOrder = { creationDate_note: -1 };
  } else {
    sortOrder = {};
  }

  Note.find({ creator_note: req.user.id, status_note: "Open" })
    .sort(sortOrder)
    .then((nota) => {
      res.render("index", {
        titulo: "MyNotes - Página Inicial",
        css: "paginaInicial.css",
        js: "paginaInicial.mjs",
        alert: req.query.alert || null,
        congrats: req.query.congrats || null,
        notes: nota,
        asc: asc || null,
        desc: desc || null,
      });
    });
});

router.post("/", (req, res) => {
  if (req.body.noteFilter == "asc") {
    res.redirect(`/?order=asc`);
  } else if (req.body.noteFilter == "desc") {
    res.redirect(`/?order=desc`);
  }
});

router.get("/new-note", isLogged, (req, res) => {
  res.render("newNote", {
    titulo: "MyNotes - Nova Nota",
    css: "newNote.css",
    js: "newNote.mjs",
    alert: req.query.alert || null,
  });
});

router.post("/new-note", isLogged, (req, res) => {
  const newNote = {
    title_note: req.body.noteTitulo,
    tag_note: req.body.noteTag,
    content_note: req.body.noteContent,
    finishDate_note: req.body.noteDate,
    creator_note: req.user.id,
  };

  new Note(newNote)
    .save()
    .then(() => {
      res.redirect("/?congrats=Nota criada com sucesso!");
    })
    .catch((err) => {
      res.redirect("/new-note?alert=Erro ao criar a nota!");
    });
});

router.get("/complete-note/:id", (req, res) => {
  Note.findOne({ _id: req.params.id })
    .then((note) => {
      note.status_note = "Completed";
      note
        .save()
        .then(() => {
          res.redirect("/?congrats=Nota completada com sucesso");
        })
        .catch((err) => {
          res.redirect("/?alert=Erro ao completar a nota!");
        });
    })
    .catch((err) => {
      res.redirect("/?alert=Erro ao encontrar a nota!");
    });
});

router.get("/cancel-note/:id", isLogged, (req, res) => {
  Note.findOne({ _id: req.params.id })
    .then((note) => {
      note.status_note = "Canceled";

      note
        .save()
        .then(() => {
          res.redirect("/?alert=Nota cancelada com sucesso");
        })
        .catch((err) => {
          res.redirect("/?alert=Erro ao cancelar a nota!");
        });
    })
    .catch((err) => {
      res.redirect("/?alert=Erro ao encontrar a nota!");
    });
});

router.get("/completed-notes", isLogged, (req, res) => {
  let asc = false;
  let desc = false;
  let sortOrder;
  if (req.query.order == "asc") {
    asc = true;
    sortOrder = { creationDate_note: 1 };
  } else if (req.query.order == "desc") {
    desc = true;
    sortOrder = { creationDate_note: -1 };
  } else {
    sortOrder = {};
  }
  Note.find({ creator_note: req.user.id, status_note: "Completed" })
    .sort(sortOrder)
    .then((note) => {
      res.render("completedNotes", {
        titulo: "MyNotes - Notas Concluídas",
        css: "completedNotes.css",
        js: "completedNotes.mjs",
        alert: req.query.alert || null,
        congrats: req.query.congrats || null,
        notes: note,
        asc: asc || null,
        desc: desc || null,
      });
    });
});

router.post("/order-completed", (req, res) => {
  if (req.body.noteFilter === "asc") {
    res.redirect("/completed-notes?order=asc");
  } else if (req.body.noteFilter === "desc") {
    res.redirect("/completed-notes?order=desc");
  }
});

router.get("/canceled-notes", isLogged, (req, res) => {
  let asc = false;
  let desc = false;
  let sortOrder;
  if (req.query.order == "asc") {
    asc = true;
    sortOrder = { creationDate_note: 1 };
  } else if (req.query.order == "desc") {
    desc = true;
    sortOrder = { creationDate_note: -1 };
  } else {
    sortOrder = {};
  }

  Note.find({ creator_note: req.user.id, status_note: "Canceled" })
    .sort(sortOrder)
    .then((note) => {
      res.render("canceledNotes", {
        titulo: "MyNotes - Notas Canceladas",
        css: "canceledNotes.css",
        js: "canceledNotes.mjs",
        alert: req.query.alert || null,
        congrats: req.query.congrats || null,
        notes: note,
        asc: asc || null,
        desc: desc || null,
      });
    });
});

router.post("/order-canceled", (req, res) => {
  if (req.body.noteFilter === "asc") {
    res.redirect("/canceled-notes?order=asc");
  } else if (req.body.noteFilter === "desc") {
    res.redirect("/canceled-notes?order=desc");
  }
});

router.get("/remove-note/:page/:id", (req, res) => {
  Note.findOne({ _id: req.params.id }).then((note) => {
    note.status_note = "Deleted";

    note
      .save()
      .then(() => {
        if (req.params.page == "completed") {
          res.redirect("/completed-notes?congrats=Removido com sucesso!");
        } else if (req.params.page == "canceled") {
          res.redirect("/canceled-notes?congrats=Removido com sucesso!");
        }
      })
      .catch((err) => {
        if (req.params.page == "completed") {
          res.redirect("/completed-notes?alert=Erro ao remover a nota!");
        } else if (req.params.page == "canceled") {
          res.redirect("/canceled-notes?alert=Erro ao remover a nota!");
        }
      });
  });
});

router.get("/note", isLogged, (req, res) => {
  if (
    req.query.noteId == "" ||
    req.query.noteId === null ||
    req.query.noteId === undefined
  ) {
    res.redirect("/?alert=Erro em achar a nota");
  } else {
    Note.findOne({ _id: req.query.noteId })
      .then((note) => {
        if (note.creator_note != req.user.id) {
          res.redirect("/?alert=Erro em achar a nota");
        } else {
          let open;
          if (note.status_note == "Open") {
            open = true;
          } else {
            open = false;
          }

          const creationDate = dateFormat(note.creationDate_note);
          const finishDate = dateFormat(note.finishDate_note);
          res.render("note", {
            titulo: note.title_note,
            css: "note.css",
            js: "note.mjs",
            alert: req.query.alert || null,
            congrats: req.query.congrats || null,
            open: open,
            notes: note,
            creationDate: creationDate,
            finishDate: finishDate,
          });
        }
      })
      .catch((err) => {
        res.redirect("/login?alert=Erro ao acessar o link!");
      });
  }
});

router.get("/tag", isLogged, (req, res) => {
  let asc = false;
  let desc = false;
  let sortOrder;
  if (req.query.order == "asc") {
    asc = true;
    sortOrder = { creationDate_note: 1 };
  } else if (req.query.order == "desc") {
    desc = true;
    sortOrder = { creationDate_note: -1 };
  } else {
    sortOrder = {};
  }

  Note.find({ tag_note: req.query.tag })
    .sort(sortOrder)
    .then((note) => {
      res.render("tag", {
        titulo: req.query.tag,
        css: "tag.css",
        js: "tag.mjs",
        alert: req.query.alert || null,
        congrats: req.query.congrats || null,
        notes: note,
        asc: asc || null,
        desc: desc || null,
      });
    })
    .catch((err) => {
      res.redirect("/?alert=Erro ao buscar a tag");
    });
});

router.post("/order-tag", (req, res) => {
  if (req.body.noteFilter == "asc") {
    res.redirect(`/tag?tag=${req.body.tagInput}&order=asc`);
  } else if (req.body.noteFilter == "desc") {
    res.redirect(`/tag?tag=${req.body.tagInput}&order=desc`);
  }
});

router.get("/profile", isLogged, (req, res) => {
  res.render("profile", {
    titulo: "MyNotes - Meu Perfil",
    css: "profile.css",
    js: "profile.mjs",
    alert: req.query.alert || null,
    congrats: req.query.congrats || null,
  });
});

router.get("/edit-profile", isLogged, (req, res) => {
  res.render("editProfile", {
    titulo: "MyNotes - Editar Perfil",
    css: "editProfile.css",
    js: "editProfile.mjs",
    alert: req.query.alert || null,
    congrats: req.query.congrats || null,
  });
});

router.get("/edit-photo", isLogged, (req, res) => {
  res.render("editPhoto", {
    titulo: "MyNotes - Editar Foto de Perfil",
    css: "editProfile.css",
    js: "editPhoto.mjs",
    alert: req.query.alert || null,
    congrats: req.query.congrats || null,
  });
});

router.post("/save-profile", (req, res) => {
  User.findOne({ _id: req.user.id }).then(async (user) => {
    user.name_user = req.body.userNameInput;
    user.email_user = req.body.userEmailInput;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.userPasswordInput, salt);

    user.password_user = hash;

    user.save().then(res.redirect("/profile?congrats=Atualizado com sucesso!"));
  });
});

router.post("/save-photo", upload.single("userImage"), (req, res, next) => {
  User.findOne({ _id: req.user.id }).then((user) => {
    const fileName = req.file.originalname;
    let reverse = fileName.split(".").reverse();
    let arrayFileName = req.user.id + "." + reverse[0];
    user.image_user = arrayFileName;
    user.save().then(() => {
      res.redirect("/profile?congrats=Salvo com sucesso!");
    });
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
