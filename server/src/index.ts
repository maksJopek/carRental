import express from "express";
// import { Sequelize, DataTypes } from "sequelize";
import dbConfig from "./dbConfig";
import cors from "cors";
const app = express();
const PORT = 8081;
app.use(cors());

// // const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
// 	`${dbConfig.dialect}://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.db}`
// );

import mariadb from "mariadb";
import { type } from "os";
import { TimeoutError } from "sequelize";
const pool = mariadb.createPool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.db,
	connectionLimit: dbConfig.pool.max,
});
async function getDataFromDb() {
	let conn;
	try {
		conn = await pool.getConnection();
		const res = await conn.query("SELECT * FROM cars");
		console.log(res);
		return res;
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.end();
	}
}
function isNumeric(str: any) {
	if (typeof str === "number") return true;
	if (typeof str !== "string") return false; // we only process strings!
	return (
		// @ts-ignore
		!isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str))
	); // ...and ensure strings of whitespace fail
}
app.use(express.json());
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
	} catch (err) {
		throw err;
	} finally {
		if (conn) return conn.end();
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
		} catch (err) {
			throw err;
		} finally {
			if (conn) return conn.end();
		}
	} else {
		res.status(400);
		res.send("We only accept numbers!");
	}
});
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
