import express from "express";
// rest of the code remains same
const app = express();
const PORT = 8081;
app.get("/", (req, res) => res.send("Express + TypeScript Server"));
app.get("/get", (req, res) => res.send("get"));
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
