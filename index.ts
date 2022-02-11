// @/index.ts
import "reflect-metadata";
import express, { Request, Response, Router, ErrorRequestHandler } from "express";

import connection from "./src/services/connection";
import {Error} from "sequelize";
const bodyParser = require('body-parser');
const { auth } = require('express-oauth2-jwt-bearer');
const dogRouter = require('./src/routes/dogRoute');

const app = express()
require('dotenv').config();

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
// TODO: Add Error handling for the Following
// UnauthorizedError
// InvalidTokenError
// InsufficientScopeError
const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER_URL,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req: Request, res: Response): Response => {
  return res.json({ message: "Sequelize Example 🤟" });
});

// Any end point following requires auth to access
app.use(checkJwt);

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
