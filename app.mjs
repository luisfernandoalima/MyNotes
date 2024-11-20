// Importando as bibliotecas
import express from "express";
import handlebars from "express-handlebars";
import bodyParser from "body-parser";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import {configureAuth} from './config/auth.mjs'; // A função exportada como padrão

configureAuth(passport);  // Chama a função passando o passport

const app = express();
const PORT = 8081;

app.use(
  session({
    secret: "MyNotesSession",
    resave: true,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

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
app.use("/", router);

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
