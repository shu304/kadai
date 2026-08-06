require('dotenv').config();
const express = require("express");

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(express.json());

// 🔥 DB作成（ファイルも自動でできる）
const db = new sqlite3.Database("./chat.db");

// 🔥 テーブル作成（なければ作る）
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT
    )
  `);
});

// 🔥 取得API
app.get("/api/messages", (req, res) => {
  db.all("SELECT * FROM messages", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// 🔥 追加API
app.post("/api/messages", (req, res) => {
  const { text } = req.body;

  db.run("INSERT INTO messages (text) VALUES (?)", [text], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID, text });
  });
});

// 🔥 React表示（最後に！）
app.use(express.static("frontend/dist"));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3026;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});