const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
const PORT = 5050;

app.use(cors());

const csvFilePath = path.join(__dirname, 'data', 'bengaluru_neighborhoods.csv');

app.get('/api/neighborhoods', (req, res) => {
  const neighborhoods = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      const neighborhood = {
        name: row.name,
        ward: row['@id'] || row.ward || '',
        safety_score: row.safety_score || 'N/A',
        avg_rent: row.avg_rent || 'N/A',
        metro_nearby_km: row.metro_nearby_km || 'N/A',
        parks_nearby: row.parks_nearby || getDemoParks(row.name),
        schools_nearby: row.schools_nearby || getDemoSchools(row.name),
        lat: row.lat || null,
        lon: row.lon || null
      };

      neighborhood.lifestyle_tags = generateLifestyleTags(neighborhood);
      neighborhoods.push(neighborhood);
    })
    .on('end', () => {
      res.json(neighborhoods);
    });
});

// Demo fallback if parks/schools missing
function getDemoParks(name) {
  const demo = {
    "Bhartiya City": "4",
    "Adarsh Palm Retreat": "1",
    "Defence Colony": "6",
    "Further Extension": "5"
  };
  return demo[name] || '2';
}

function getDemoSchools(name) {
  const demo = {
    "Bhartiya City": "4",
    "Adarsh Palm Retreat": "8",
    "Defence Colony": "12",
    "Further Extension": "3"
  };
  return demo[name] || '2';
}

function generateLifestyleTags(neighborhood) {
  const tags = [];

  const schools = parseInt(neighborhood.schools_nearby) || 0;
  const parks = parseInt(neighborhood.parks_nearby) || 0;
  const metro = parseFloat(neighborhood.metro_nearby_km) || 100;
  const safety = parseFloat(neighborhood.safety_score) || 0;
  const rent = parseInt(neighborhood.avg_rent) || 0;

  if (schools >= 3 && parks >= 2) {
    tags.push("👨‍👩‍👧‍👦 Family-Friendly");
  }
  if (metro <= 2.5 && rent > 20000) {
    tags.push("💼 Working Professionals");
  }
  if (safety >= 7.5 && parks >= 3) {
    tags.push("🧘 Quiet Neighborhoods");
  }
  if (metro <= 1.5) {
    tags.push("🧍‍♂️ Walkable & Connected");
  }

  return tags;
}


app.listen(PORT, () => {
  console.log(`✈️ Server running on http://localhost:${PORT}`);
});
