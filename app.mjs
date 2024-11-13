// Importando as bibliotecas
import express from "express";
import handlebars from "express-handlebars";
import bodyParser from "body-parser";

const app = express();
const PORT = 8081;

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
app.use("/", router)

app.listen(PORT, () => {
  console.log(`Servidor Online na porta: ${PORT}`);
});
