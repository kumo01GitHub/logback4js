import express, { json } from "express";

const app = express();
app.use(json());

app.post("/log", (req, res) => {
  console.log(`[/log] Request: ${JSON.stringify(req.body)}`);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
