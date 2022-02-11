// @/index.ts
import "reflect-metadata";
import express, { Request, Response, Router } from "express";

import connection from "./src/services/connection";
const bodyParser = require('body-parser');
const dogRouter = require('./src/routes/dogRoute');

const app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Sequelize Example 🤟" });
});


app.use('/dogs', dogRouter);

const start = async (): Promise<void> => {
  try {
    await connection.sync();
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void start();
