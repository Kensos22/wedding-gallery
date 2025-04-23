const express = require("express");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dxwtbpog2", // Replace with your Cloudinary cloud name
  api_key: "916571592155145", // Replace with your Cloudinary API key
  api_secret: "IwNjnmVUBti4QSBgGaK4B6mWS2w", // Replace with your Cloudinary API secret
});

// Endpoint to get recent images with uploader info
app.get("/photos", async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      max_results: 20,
      sort_by: [{ created_at: "desc" }],
      context: true
    });

    const images = result.resources.map((image) => ({
      url: image.secure_url,
      uploader: image.context?.custom?.uploader || "Unknown"
    }));

    res.json({ success: true, images });
  } catch (err) {
    console.error("Error fetching images from Cloudinary:", err);
    res.status(500).json({ success: false, message: "Error fetching images" });
  }
});

// Serve static files (like your `gallery.html`)
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
