"use strict";
// let dbConfig = {
// bla: 123,
// };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    host: "127.0.0.1",
    user: "carRent",
    password: "qwerty123",
    db: "CarRent",
    dialect: "mariadb",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
