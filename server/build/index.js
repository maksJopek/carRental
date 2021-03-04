"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { Sequelize, DataTypes } from "sequelize";
const dbConfig_1 = __importDefault(require("./dbConfig"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const PORT = 8081;
app.use(cors_1.default());
// // const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
// 	`${dbConfig.dialect}://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.db}`
// );
const mariadb_1 = __importDefault(require("mariadb"));
const pool = mariadb_1.default.createPool({
    host: dbConfig_1.default.host,
    user: dbConfig_1.default.user,
    password: dbConfig_1.default.password,
    database: dbConfig_1.default.db,
    connectionLimit: dbConfig_1.default.pool.max,
});
async function getDataFromDb() {
    let conn;
    try {
        conn = await pool.getConnection();
        const res = await conn.query("SELECT * FROM cars");
        console.log(res);
        return res;
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn)
            return conn.end();
    }
}
function isNumeric(str) {
    if (typeof str === "number")
        return true;
    if (typeof str !== "string")
        return false; // we only process strings!
    return (
    // @ts-ignore
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))); // ...and ensure strings of whitespace fail
}
app.use(express_1.default.json());
app.get("/", (req, res) => res.send("Express + TypeScript Server"));
app.get("/getCars", async (req, res) => {
    // res.set("Access-Control-Allow-Origin", "http://localhost:8080");
    // res.set("Access-Control-Allow-Method", "GET");
    let conn, fromDb;
    try {
        conn = await pool.getConnection();
        fromDb = await conn.query("SELECT * FROM `cars`");
        // console.log(fromDb);
        res.send(fromDb);
    }
    catch (err) {
        throw err;
    }
    finally {
        if (conn)
            return conn.end();
    }
});
app.post("/rentCar", async (req, res) => {
    let id = req.body.id;
    if (isNumeric(id)) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query("UPDATE `cars` SET `rented`=true WHERE `id`=" + id);
            res.status(204);
            res.send("");
        }
        catch (err) {
            throw err;
        }
        finally {
            if (conn)
                return conn.end();
        }
    }
    else {
        res.status(400);
        res.send("We only accept numbers!");
    }
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
