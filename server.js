const express = require("express");
const fetch = require("node-fetch"); // v2
const cors = require("cors");

const app = express();
app.use(cors());

// ---- SEARCH MANGA ----
app.get("/search", async (req, res) => {
    const query = req.query.title;
    if (!query) return res.status(400).json({ error: "Missing query" });

    try {
        const response = await fetch(
            `https://api.mangadex.org/manga?title=${encodeURIComponent(query)}&limit=10&includes[]=cover_art`
        );
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch manga" });
    }
});

// ---- GET CHAPTERS ----
app.get("/chapters/:mangaId", async (req, res) => {
    const { mangaId } = req.params;

    try {
        const response = await fetch(
            `https://api.mangadex.org/chapter?manga=${mangaId}&translatedLanguage[]=en&order[chapter]=asc&limit=50`
        );

        if (!response.ok) return res.json({ data: [] });

        const data = await response.json();
        const chapters = (data.data || []).map(chap => ({
            id: chap.id,
            chapter: chap.attributes.chapter || "N/A",
            title: chap.attributes.title || "",
            publishedAt: chap.attributes.publishAt || ""
        }));

        res.json({ data: chapters });

    } catch (err) {
        console.error(err);
        res.json({ data: [] });
    }
});

// ---- IMAGE PROXY ----
app.get("/cover/:mangaId/:fileName", async (req, res) => {
    const { mangaId, fileName } = req.params;

    try {
        const imageUrl = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
        const response = await fetch(imageUrl);

        if (!response.ok) return res.status(404).send("Image not found");

        const buffer = await response.buffer();
        const ext = fileName.split('.').pop().toLowerCase();
        let contentType = "image/jpeg";
        if (ext === "png") contentType = "image/png";
        if (ext === "webp") contentType = "image/webp";

        res.set("Content-Type", contentType);
        res.send(buffer);

    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading image");
    }
});

// ---- START SERVER ----
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
