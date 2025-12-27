const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const modeBtn = document.getElementById("modeBtn");

// ----- Light/Dark Mode Toggle -----
modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    modeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// ----- Search Button -----
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) searchManga(query);
});

// ----- Search Manga -----
async function searchManga(query) {
    resultsDiv.innerHTML = "Loading...";

    try {
        const response = await fetch(`http://localhost:3000/search?title=${encodeURIComponent(query)}`);
        const data = await response.json();

        resultsDiv.innerHTML = "";

        if (!data.data || data.data.length === 0) {
            resultsDiv.innerHTML = "No results found";
            return;
        }

        data.data.forEach((manga) => {
            let title = "No Title";
            if (manga.attributes.title) {
                if (manga.attributes.title.en) title = manga.attributes.title.en;
                else title = Object.values(manga.attributes.title)[0];
            }

            let coverUrl = "https://via.placeholder.com/200x300?text=No+Cover";
            const coverRel = manga.relationships.find(rel => rel.type === "cover_art");
            if (coverRel?.attributes?.fileName) {
                coverUrl = `http://localhost:3000/cover/${manga.id}/${coverRel.attributes.fileName}`;
            }

            const card = document.createElement("div");
            card.className = "manga-card";
            card.innerHTML = `
                <img src="${coverUrl}" alt="${title}">
                <h3>${title}</h3>
            `;

            card.addEventListener("click", () => {
                displayChaptersWithCover(manga.id, title, coverUrl);
            });

            resultsDiv.appendChild(card);
        });

    } catch (err) {
        console.error(err);
        resultsDiv.innerHTML = "Error fetching data";
    }
}

// ----- Display Chapters with Cover -----
async function displayChaptersWithCover(mangaId, mangaTitle, coverUrl) {
    resultsDiv.innerHTML = "";

    // Back Button
    const backBtn = document.createElement("button");
    backBtn.id = "backBtn";
    backBtn.textContent = "← Back to search";
    backBtn.addEventListener("click", () => {
        searchManga(searchInput.value.trim());
    });
    resultsDiv.appendChild(backBtn);

    // Cover
    const coverImg = document.createElement("img");
    coverImg.src = coverUrl;
    coverImg.alt = mangaTitle;
    coverImg.className = "manga-cover-display";
    resultsDiv.appendChild(coverImg);

    // Chapters
    const chaptersDiv = document.createElement("div");
    chaptersDiv.className = "chapters-list";
    chaptersDiv.innerHTML = `<h4>Chapters of ${mangaTitle}</h4><div class="spinner"></div>`;
    resultsDiv.appendChild(chaptersDiv);

    try {
        const response = await fetch(`http://localhost:3000/chapters/${mangaId}`);
        const data = await response.json();

        chaptersDiv.innerHTML = `<h4>Chapters of ${mangaTitle}</h4>`;

        if (!data.data || data.data.length === 0) {
            chaptersDiv.innerHTML += "<p>No chapters found</p>";
            return;
        }

        const ul = document.createElement("ul");
        data.data.forEach(chap => {
            const chapterNum = chap.chapter || "N/A";
            const chapterTitle = chap.title || "";
            const mangaDexLink = `https://mangadex.org/chapter/${chap.id}`;
            const li = document.createElement("li");
            li.innerHTML = `<a href="${mangaDexLink}" target="_blank">Chapter ${chapterNum} ${chapterTitle}</a>`;
            ul.appendChild(li);
        });
        chaptersDiv.appendChild(ul);

    } catch (err) {
        console.error(err);
        chaptersDiv.innerHTML += "<p>Error fetching chapters</p>";
    }
}
