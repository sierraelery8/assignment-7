const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const app = express();
app.use(express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_NAME
});

const Track = sequelize.define("Track", {
  trackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  songTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artistName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  albumName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: DataTypes.INTEGER,
  releaseYear: DataTypes.INTEGER
});


// GET all tracks
app.get("/api/tracks", async (req, res) => {
  const tracks = await Track.findAll();
  res.json(tracks);
});


// GET track by ID
app.get("/api/tracks/:id", async (req, res) => {
  const track = await Track.findByPk(req.params.id);

  if (!track) {
    return res.status(404).json({ error: "Track not found" });
  }

  res.json(track);
});


// POST create track
app.post("/api/tracks", async (req, res) => {

  const { songTitle, artistName, albumName, genre } = req.body;

  if (!songTitle || !artistName || !albumName || !genre) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const track = await Track.create(req.body);

  res.status(201).json(track);
});


// PUT update track
app.put("/api/tracks/:id", async (req, res) => {

  const updated = await Track.update(req.body, {
    where: { trackId: req.params.id }
  });

  if (updated[0] === 0) {
    return res.status(404).json({ error: "Track not found" });
  }

  res.json({ message: "Track updated" });
});


// DELETE track
app.delete("/api/tracks/:id", async (req, res) => {

  const deleted = await Track.destroy({
    where: { trackId: req.params.id }
  });

  if (!deleted) {
    return res.status(404).json({ error: "Track not found" });
  }

  res.json({ message: "Track deleted" });
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
