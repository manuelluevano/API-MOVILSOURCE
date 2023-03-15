const express = require("express");
const routerApi = require("./routes");
const cors = require("cors");

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

//PERMITIR CONSUMO DESDE OTRA FUENTE
const whitelist = [
  "http://localhost:8080",
  "http://localhost:3000",
  "https://myapp.co",
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(cors(options));

//ERRORES
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Mi puerto", port);
});

routerApi(app);
