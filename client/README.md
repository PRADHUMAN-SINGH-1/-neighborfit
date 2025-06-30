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

## 🛠️ Tech Stack

- **Frontend**: React.js (with useState + useEffect hooks)
- **Backend**: Node.js with Express
- **Data**: Local CSV file parsed using `csv-parser`
- **Styling**: Tailwind CSS + custom CSS for polish

---

## 🧪 How It Works (Behind the Scenes)

- When the app loads, the backend reads a `.csv` file containing data about each neighborhood.
- The frontend fetches this data using a REST API (`/api/neighborhoods`).
- The user can filter and explore this information through a friendly UI.
- Each card displays lifestyle info and optionally shows a map location.

---

## 🖥️ How to Run It Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/PRADHUMAN-SINGH-1/-neighborfit.git
   cd neighborfit
