import express from "express";
const router = express.Router();

import isAdmin from "../helpers/isAdmin.mjs";

router.get("/", isAdmin, (req, res) => {
  res.render("admin/index", {
    titulo: "Admin - Home",
    css: "adminHome.css",
    js: "adminHome.mjs",
    admin: req.user.admin,
  });
});

export { router as routerAdmin };
