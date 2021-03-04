import express from "express";
import dbConfig from "./dbConfig";
import cors from "cors";
const app = express();
const PORT = 8081;
app.use(cors());

import mariadb from "mariadb";
const pool = mariadb.createPool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.db,
	connectionLimit: dbConfig.pool.max,
});
async function getDataFromDb(whatToDo: number, id = 0) {
	let conn = await pool.getConnection(),
		out,
		query;

	if (whatToDo === 1) query = "SELECT * FROM cars";
	/* if (whatToDo === 2) */ else
		query = "UPDATE `cars` SET `rented`=true WHERE `id`=" + id;

	out = conn.query(query);
	if (conn) conn.end();
	return out;
}
function isNumeric(str: any): boolean {
	if (typeof str === "number") return true;
	if (typeof str !== "string") return false;
	return (
		// @ts-ignore
		!isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
	);
}
app.use(express.json());
app.get("/getCars", async (req, res) => {
	res.send(await getDataFromDb(1));
});
app.post("/rentCar", async (req, res) => {
	let id = req.body.id;
	if (isNumeric(id)) {
		await getDataFromDb(2, id);
		res.status(204);
		res.send("");
	} else {
		res.status(400);
		res.send("We only accept numbers!");
	}
});
app.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
