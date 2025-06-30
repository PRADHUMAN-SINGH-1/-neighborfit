# 🏡 NeighborFit

NeighborFit is your smart companion to explore neighborhoods in **Bengaluru** — one of India’s busiest and most vibrant cities. Whether you're moving in, relocating within the city, or just curious about different areas, this app helps you make an **informed lifestyle decision**.

---

##  What is NeighborFit?

NeighborFit is a web app that shows detailed information about various Bengaluru neighborhoods. It uses a simple and clean interface to display:

- 📊 **Safety scores**
- 🏠 **Average rent**
- 🚇 **Proximity to metro stations**
- 🌳 **Nearby parks**
- 🏫 **Nearby schools**
- 📍 **Google Maps location**

It also includes **smart badges** like “Safe”, “Metro Nearby”, and “High Rent” to help you quickly identify key aspects of each neighborhood.

---

## 🔍 Key Features

- **🔎 Real-time filtering**  
  Search neighborhoods by name, or filter based on:
  - Maximum rent
  - Minimum safety score

- **🏷️ Smart tags (badges)**  
  Visual labels help you spot:
  - Safe neighborhoods
  - Ones close to the metro
  - High-rent zones

- **📍 Google Maps integration**  
  View any neighborhood directly on the map with one click.

- **🖤 Dark mode UI**  
  Clean, modern, and comfortable for browsing at night.

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

## 📌 Notes

This app highlights my ability to:
- Work with **real geo-data**
- Set up both frontend and backend pipelines
- Deploy full-stack apps using **zero budget** hosting services
- Debug, refactor, and deploy under time constraints

Feel free to explore the [live site](https://neighborhoodfit.netlify.app) or backend [API](https://neighborhoodfit-backend.onrender.com/api/neighborhoods).

---
