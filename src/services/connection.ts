// @/connection.ts
import { Sequelize } from "sequelize-typescript";

import { Dog } from '../entity/dogsEntity';
require('dotenv').config();


const connection = new Sequelize({
    dialect: "mariadb",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    models: [Dog],
});
// const connection = new Sequelize({
//     dialect: process.env.DB_DIALECT,
//     host: process.env.DB_HOST,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     logging: true,
//     models: [Dog],
// });


connection.sync({alter: true});

export default connection;
