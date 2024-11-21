// Importando as bibliotecas
import express from "express";
import handlebars from "express-handlebars";
import bodyParser from "body-parser";
import session from "express-session";
import mongoose from "mongoose";
import passport from 'passport';
import auth from './config/auth.mjs'
auth(passport);

const app = express();
const PORT = 8081;
// Sessão
app.use(
  session({
    secret: "MyNotesSession",
    resave: true,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Middleware

app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

// HandleBars
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

import router from "./routes/router.mjs";
import {routerAdmin} from "./routes/admin.mjs"
app.use("/", router);
app.use("/admin", routerAdmin)

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost/mynotes")
  .then(() => {
    console.log("Conectado ao Banco de Dados!");
  })
  .catch((err) => {
    console.log("Erro ao tentar conectar no Banco de Dados: " + err);
  });

app.listen(PORT, () => {
  console.log(`Servidor Online na porta: ${PORT}`);
});
