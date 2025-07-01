# 🏙️ NeighborhoodFit

🔴**Important Note**: Website uses free backend Render support, so there's a waiting time of around **1 minute** when fetching data on the live website.

**🔗 Live Demo:** [https://neighborhoodfit.netlify.app](https://neighborhoodfit.netlify.app)  
**🌐 Backend API:** [https://neighborfit-y283.onrender.com/api/neighborhoods](https://neighborfit-y283.onrender.com/api/neighborhoods)

NeighborhoodFit is a full-stack web application that helps users explore the best neighborhoods in **Bengaluru, India** based on safety, rent level, metro access, and lifestyle indicators.

---

## 📡 What does it do?

Whether you're moving to Bengaluru or just exploring better areas to live in, **NeighborhoodFit** lets you:

- 📍 View safety scores of neighborhoods  
- 💰 Check average rent levels  
- 🚇 Filter areas by metro station proximity  
- 🌱 Know about nearby parks, schools, and lifestyle factors  
- 🔍 Search and filter neighborhoods easily  
- 🏷️ Visually understand tags like "Family-Friendly" or "Walkable" with colorful animated badges

---

## 📊 Where did the data come from?

The data behind this app was **not random** — I carefully created it using real sources!

### 📥 CSV Data Source:
- **Tool Used:** [Overpass Turbo](https://overpass-turbo.eu/)  
- **Base Map:** [OpenStreetMap](https://www.openstreetmap.org)

I used Overpass queries to extract geo and place data for Bengaluru’s neighborhoods, including:
- Neighborhood names (`place=neighbourhood`)
- Location coordinates
- Proximity to metro stations
- Parks and schools nearby

Then, I manually enriched it with:
- Safety scores (based on public crime index zones)
- Rent levels (from 99acres and MagicBricks trends)
- Labels like "High Safety", "Affordable", "Metro Nearby"
- **Lifestyle tags** based on density of schools, parks, noise zones, walkability and more

🗂️ Final dataset: `bengaluru_neighborhoods.csv`  
This is stored on the server and served via an API.

---

## 🎨 How lifestyle badges were calculated

I implemented **smart, color-coded, animated badges** to make lifestyle insights instantly scannable. Here's how they were determined:

### 🏷️ Badge Logic
Each neighborhood in the dataset contains an array of `lifestyle_tags`, such as:

```json
lifestyle_tags: ["Family-Friendly", "Working Professionals", "Quiet Neighborhoods", "Walkable & Connected"]
```

These tags were **manually computed** based on a combination of:
- ✅ Number of nearby **schools** → "Family-Friendly"
- ✅ Density of **offices/co-working** → "Working Professionals"
- ✅ Low traffic/noise zones → "Quiet Neighborhoods"
- ✅ Proximity to **metro**, parks, footpaths → "Walkable & Connected"

### 🎨 Badge Styling
- Each badge uses **semantic colors** (e.g., green for safety, red for high rent)
- Styled via Tailwind-like CSS with:
  - Rounded edges
  - Animations (fade-in and hover zoom)
  - Flex-wrap to prevent overlap

Example badge classes in CSS:
```css
.badge.lifestyle.family       { background-color: #4caf50; } /* Green */
.badge.lifestyle.professional { background-color: #2196f3; } /* Blue */
.badge.lifestyle.quiet        { background-color: #9c27b0; } /* Purple */
.badge.lifestyle.walkable     { background-color: #ff9800; } /* Orange */
```

These badges appear under each neighborhood card, enriching the UI with interactive lifestyle metadata.

---

## 🖥️ Project Structure

```
NeighborFit/
├── client/
│   ├── public/
│   └── src/
│       ├── App.js                  # Main React component that sets up the UI and handles state
│       ├── App.css                 # Styling for App.js
│       ├── NeighborhoodList.js    # Component to display filtered list of neighborhoods
│       └── NeighborhoodList.css   # Styling for NeighborhoodList.js
├── server/
│   ├── data/
│   │   └── bengaluru_neighborhoods.csv   # Real dataset containing neighborhood info including population
│   └── index.js                   # Express server that serves the API endpoints
└── README.md                     # Project documentation including setup, features, and deployment
```

---

## 🧰 Tech Stack

| Layer     | Tech                     |
|-----------|--------------------------|
| Frontend  | React.js, Tailwind CSS   |
| Backend   | Node.js, Express         |
| Data      | OpenStreetMap via Overpass Turbo |
| Hosting   | Netlify (Frontend), Render (Backend) |

---

## 🚀 Key Features

- ✅ **Dynamic filtering** by rent, safety, and metro access
- ✅ **Smart badges** (e.g., ₹ for rent, lifestyle tags like "Family-Friendly")
- ✅ **Animated badge appearance** with hover effect
- ✅ **Responsive UI** with Tailwind styling
- ✅ **Google Maps links** to neighborhoods
- ✅ **Real-time data fetching** from backend API

---

## ⚙️ How the backend works

- Server created with **Node.js + Express**
- Data is parsed from CSV using `csv-parser`
- Public API endpoint:
  ```
  https://neighborhoodfit-backend.onrender.com/api/neighborhoods
  ```

📦 **Deployed via Render:**  
- Auto-deploy connected to GitHub repo  
- Backend URL is set in `.env` as:
  ```
  REACT_APP_API_BASE_URL=https://neighborhoodfit-backend.onrender.com
  ```

---

## 🌐 How frontend connects

React fetches data on page load using `useEffect()`:

```js
useEffect(() => {
  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/neighborhoods`)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.error(err));
}, []);
```

Frontend is hosted on **Netlify**, with:
- `npm run build`
- Publish directory: `client/build`
- Env variable added under **Site Settings → Environment → Variables**

---

## 👤 Author

Made by [Pradhuman Singh](https://github.com/PRADHUMAN-SINGH-1)  
This project is built with 💙 as a demonstration of:
- Real-world data acquisition
- Full-stack deployment
- Functional React + REST API integration
- Clean UI/UX thinking

---

## 📌 Notes for Reviewers / HR

This app highlights my ability to:
- Work with **real geo-data**
- Design UI badges from dataset logic
- Set up both frontend and backend pipelines
- Deploy full-stack apps using **zero budget** hosting services
- Debug, refactor, and deploy under time constraints

Feel free to explore the [live site](https://neighborhoodfit.netlify.app) or backend [API](https://neighborhoodfit-backend.onrender.com/api/neighborhoods).

---
