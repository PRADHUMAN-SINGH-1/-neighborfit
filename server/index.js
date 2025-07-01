const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
const PORT = 5050;

app.use(cors());

const csvFilePath = path.join(__dirname, 'data', 'bengaluru_neighborhoods.csv');

// Generate lifestyle tags based on rules
function generateLifestyleTags(n) {
  const tags = [];

  if (parseInt(n.schools_nearby) >= 3 && parseInt(n.parks_nearby) >= 2) {
    tags.push("👨‍👩‍👧‍👦 Family-Friendly");
  }
  if (parseFloat(n.metro_nearby_km) <= 2.5 && parseInt(n.avg_rent) > 20000) {
    tags.push("💼 Working Professionals");
  }
  if (parseFloat(n.safety_score) >= 7.5 && parseInt(n.parks_nearby) >= 3) {
    tags.push("🧘 Quiet Neighborhoods");
  }
  if (parseFloat(n.metro_nearby_km) <= 1.5) {
    tags.push("🧍‍♂️ Walkable & Connected");
  }

  return tags;
}

// Optional fallback demo schools
function getDemoSchools(name) {
  const demo = {
    "Bhartiya City": "2",
    "Adarsh Palm Retreat": "8",
    "Defence Colony": "12",
    "Further Extension": "3"
  };
  return demo[name] || "2";
}

// Optional fallback demo parks
function getDemoParks(name) {
  const demo = {
    "Bhartiya City": "4",
    "Adarsh Palm Retreat": "1",
    "Defence Colony": "6",
    "Further Extension": "5"
  };
  return demo[name] || "2";
}

// API endpoint
app.get('/api/neighborhoods', (req, res) => {
  const neighborhoods = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      const enrichedRow = {
        name: row.name,
        ward: row['@id'] || row.ward || '',
        population: row.population || 'N/A',
        safety_score: row.safety_score || '0',
        avg_rent: row.avg_rent || '0',
        metro_nearby_km: row.metro_nearby_km || '100',
        parks_nearby: row.parks_nearby || getDemoParks(row.name),
        schools_nearby: row.schools_nearby || getDemoSchools(row.name),
        lat: row.lat || null,
        lon: row.lon || null,
      };

      enrichedRow.lifestyle_tags = generateLifestyleTags(enrichedRow);
      neighborhoods.push(enrichedRow);
    })
    .on('end', () => {
      res.json(neighborhoods);
    });
});

app.listen(PORT, () => {
  console.log(`✈️ Server running on http://localhost:${PORT}`);
});
