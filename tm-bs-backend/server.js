require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const app = express();

// Enable CORS for your GitHub Pages frontend
app.use(cors({ origin: "https://methmethi40-ux.github.io" }));

// Configure Cloudinary from CLOUDINARY_URL
cloudinary.config({
  cloud_name: "ddryt9alc", // your cloud name
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// Test Cloudinary connection on server start
cloudinary.api.resources({ type: "upload", max_results: 5 })
  .then(result => console.log("Cloudinary connected! Sample media count:", result.resources.length))
  .catch(err => console.error("Cloudinary connection error:", err));

// API route to fetch media
app.get("/api/media", async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      max_results: 100
    });
    res.json(result); // returns { resources: [...] }
  } catch (err) {
    console.error("Cloudinary fetch error:", err);
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
