// @/connection.ts
import { Sequelize } from "sequelize-typescript";

import { Dog } from '../entity/dogsEntity';

const connection = new Sequelize({
    dialect: "mariadb",
    host: "db",
    username: "root",
    password: "",
    database: "portfolio",
    logging: false,
    models: [Dog],
});

export default connection;
