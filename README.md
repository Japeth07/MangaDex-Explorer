# MangaDex-Explorer

MangaDex-Explorer is a clean, responsive web application that allows users to explore the vast library of manga available on MangaDex. Users can search for specific titles, view high-quality cover art, and browse chapter lists with direct links to read on MangaDex.

---

## Features

- **Dynamic Search:** Search for any manga title via the MangaDex API.
- **Rich Visuals:** High-resolution display of manga cover images.
- **Detailed View:** Click on any manga card to view its specific details, including:
  - Full-size cover art.
  - Comprehensive list of chapters.
  - Direct external links to read on MangaDex.
- **Smooth Navigation:** Includes a "Back" button to return to search results without losing context.
- **Theme Toggle:** Built-in Light and Dark mode for a comfortable reading experience.
- **Responsive Design:** Fully optimized for both desktop and mobile devices.

---

## Installation

Follow these steps to get your local development environment running:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/japeth07/mangadex-explorer.git](https://github.com/japeth07/mangadex-explorer.git)
Navigate to the project folder:

Bash

cd mangadex-explorer
Install dependencies:

Bash

npm install
Usage
Start the server:

Bash

npm start
Open your browser: Navigate to http://localhost:3000.

Explore:

Enter a manga title in the search bar and hit Search.

Click a manga card to see covers and chapters.

Toggle Light/Dark mode using the button in the header.

Project Structure
Plaintext

## Project Structure

```text
mangadex-explorer/
│
├── index.html     # Main frontend structure
├── style.css      # Layout, responsiveness, and theme styling
├── script.js     # Frontend logic and DOM manipulation
├── server.js      # Express server & API proxy logic
├── package.json   # Project dependencies and scripts
└── README.md      # Project documentation

---

Dependencies
Express: Minimalist web framework for Node.js.

node-fetch v2: A light-weight module that brings window.fetch to Node.js for API requests.

CORS: Middleware to enable Cross-Origin Resource Sharing.

API References
This project utilizes the following MangaDex API endpoints:

[suspicious link removed]: Core API reference.

Chapter Search: Used to fetch the list of available chapters for a specific manga.

Cover Art: Used to retrieve the correct image filenames for manga titles.
