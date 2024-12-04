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
  let limit = 10;
  let page = (req.params.page - 1) * limit;

  User.find()
    .skip(page)
    .limit(limit)
    .then((user) => {
      User.countDocuments().then((count) => {
        let pagesArray = [];
        let totalPage = Math.ceil(count / limit);

        for (let c = 1; c <= totalPage; c++) {
          pagesArray.push(c);
        }
        res.render("admin/users", {
          titulo: "MyNotes - Controle de Usuários",
          css: "adminUser.css",
          js: "adminUser.mjs",
          admin: req.user.admin,
          users: user,
          totalPages: pagesArray,
        });
      });
    });
});

export { router as routerAdmin };
