import express from "express";
import { Sequelize } from "sequelize";
import dbConfig from "./dbConfig";
const app = express();
const PORT = 8081;

// const Sequelize = require("sequelize");
const sequelize = new Sequelize(
	`${dbConfig.dialect}://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.db}`
);

sequelize
	.authenticate()
	.then(() => {
		console.log("Connection has been established successfully.");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

app.get("/", (req, res) => res.send("Express + TypeScript Server"));
app.get("/getCars", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.send(`[
		{
			"name": "Opel Astra",
			"year": 20010,
			"price": 500,
			"photoUrl": "https://jopek.eu/opelAstra",
			"equipment": "klimatyzacja, czujnik parkowania",
			"key": 0
		}
	]`);
});
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
