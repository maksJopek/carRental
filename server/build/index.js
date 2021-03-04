"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// rest of the code remains same
const app = express_1.default();
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
