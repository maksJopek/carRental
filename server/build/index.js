"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./dbConfig"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const PORT = 8081;
app.use(cors_1.default());
const mariadb_1 = __importDefault(require("mariadb"));
const pool = mariadb_1.default.createPool({
    host: dbConfig_1.default.host,
    user: dbConfig_1.default.user,
    password: dbConfig_1.default.password,
    database: dbConfig_1.default.db,
    connectionLimit: dbConfig_1.default.pool.max,
});
async function getDataFromDb(whatToDo, id = 0) {
    let conn = await pool.getConnection(), out, query;
    if (whatToDo === 1)
        query = "SELECT * FROM cars";
    /* if (whatToDo === 2) */ else
        query = "UPDATE `cars` SET `rented`=true WHERE `id`=" + id;
    out = conn.query(query);
    if (conn)
        conn.end();
    return out;
}
function isNumeric(str) {
    if (typeof str === "number")
        return true;
    if (typeof str !== "string")
        return false;
    return (
    // @ts-ignore
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    );
}
app.use(express_1.default.json());
app.get("/getCars", async (req, res) => {
    res.send(await getDataFromDb(1));
});
app.post("/rentCar", async (req, res) => {
    let id = req.body.id;
    if (isNumeric(id)) {
        await getDataFromDb(2, id);
        res.status(204);
        res.send("");
    }
    else {
        res.status(400);
        res.send("We only accept numbers!");
    }
});
app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
