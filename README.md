# MangaDex-Explorer
A web application that allows users to search for manga from MangaDex API, view manga covers, and see chapter lists with links to MangaDex. Built with Node.js, Express, HTML, CSS, and JavaScript.
---
Features
---
Search manga by title
Display manga cover images
Click manga card to view:
Manga cover
List of chapters (links to MangaDex)
Back button to return to search results
Light/Dark mode toggle
Responsive layout (desktop and mobile)
---
Installation
Clone this repository:
git clone https://github.com/japeth07/mangadex-explorer.git
---
Navigate to project folder:
cd mangadex-explorer
---
Install dependencies:
npm install
Usage
---
Start the server:
npm start

---
Open your browser and go to:
http://localhost:3000

Enter a manga title in the search bar and click Search.
Click on a manga card to see its cover and chapters.
Use the Back button to return to search results.
Toggle Light/Dark mode using the button at the top.
---
Project Structure
mangadex-explorer/
│
├─ index.html           # Main HTML page
├─ style.css            # Styles for layout, responsiveness, dark mode
├─ script.js            # Frontend JavaScript logic
├─ server.js            # Express server for API proxy
├─ package.json         # Node.js dependencies and scripts
└─ README.md            # Project documentation
---
Dependencies
---
Express
 – Web framework
---
node-fetch v2
 – For server-side API requests
---
cors
 – Enable cross-origin requests
---
API References
---
MangaDex API Documentation
Chapter Search
Cover Art
