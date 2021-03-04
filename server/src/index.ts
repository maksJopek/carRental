import express from "express";
// rest of the code remains same
const app = express();
const PORT = 8081;
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
