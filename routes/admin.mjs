import express from "express";
const router = express.Router();
import { User } from "../models/User.mjs";
import { Note } from "../models/Note.mjs";

import isAdmin from "../helpers/isAdmin.mjs";

router.get("/", isAdmin, (req, res) => {
  res.render("admin/index", {
    titulo: "Admin - Home",
    css: "adminHome.css",
    js: "adminHome.mjs",
    admin: req.user.admin,
  });
});

router.get("/users/:page", isAdmin, (req, res) => {
  User.find().skip(req.params.page).then((user) => {
    res.render("admin/users", {
      titulo: "MyNotes - Controle de Usuários",
      css: "adminUser.css",
      js: "adminUser.mjs",
      admin: req.user.admin,
      users: user,
    });
  });
});

export { router as routerAdmin };
