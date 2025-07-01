# 🏙️ NeighborhoodFit

🔴**Important Note Website uses free backend Render support . So, waiting Time of 1 minute is there for data fetching in live Website.

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

---

## 📊 Where did the data come from?

The data behind this app was **not random** — I carefully created it using real sources!

### 📥 CSV Data Source:
- **Tool Used:** [Overpass Turbo](https://overpass-turbo.eu/)  
- **Base Map:** [OpenStreetMap](https://www.openstreetmap.org)  
- I used Overpass queries to extract geo and place data for Bengaluru’s neighborhoods, including:
  - Neighborhood names (`place=neighbourhood`)
  - Location coordinates
  - Proximity to metro stations
  - Parks and schools nearby

Then, I manually enriched it with:
- Safety scores (based on public crime index zones)
- Rent levels (from 99acres and MagicBricks trends)
- Labels like "High Safety", "Affordable", "Metro Nearby"

🗂️ Final dataset: `neighborhood_data.csv`  
This is stored on the server and served via an API.

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
- ✅ **Smart badges** (e.g., ₹ for rent, safety levels)
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
- 1 minute waiting Time for data to appear on Live Website
- Set up both frontend and backend pipelines
- Deploy full-stack apps using **zero budget** hosting services
- Debug, refactor, and deploy under time constraints

Feel free to explore the [live site](https://neighborhoodfit.netlify.app) or backend [API](https://neighborhoodfit-backend.onrender.com/api/neighborhoods).

---
