const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost/url_shortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the URL schema
const urlSchema = new mongoose.Schema({
  shortId: String,
  originalUrl: String,
});

const Url = mongoose.model("Url", urlSchema);

app.use(express.json());

// Redirect from short URL to original URL
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const url = await Url.findOne({ shortId: id });

    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new short URL
app.post("/shorten", async (req, res) => {
  try {
    const { url } = req.body;
    const shortId = shortid.generate();

    const newUrl = new Url({
      shortId,
      originalUrl: url,
    });

    await newUrl.save();

    const shortUrl = `http://yourdomain.com/${shortId}`;
    res.json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
