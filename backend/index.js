import express from "express";

const app = express();

app.get("/messages", (req, res) => {
  res.json([
    { id: 1, text: "こんにちは" },
    { id: 2, text: "Hello" },
  ]);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});