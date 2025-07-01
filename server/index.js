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
      neighborhoods.push({
        name: row.name,
        ward: row['@id'] || row.ward || '',
        safety_score: row.safety_score || 'N/A',
        avg_rent: row.avg_rent || 'N/A',
        metro_nearby_km: row.metro_nearby_km || 'N/A',
        parks_nearby: row.parks_nearby || getDemoParks(row.name),
        schools_nearby: row.schools_nearby || getDemoSchools(row.name),
        lat: row.lat || null,
        lon: row.lon || null
      });
    })
    .on('end', () => {
      res.json(neighborhoods);
    });
});

function getDemoParks(name) {
  const demo = {
    "Bhartiya City": "Skyline Park, Eco Garden",
    "Adarsh Palm Retreat": "Sunset Garden, Palm Green Park",
    "Defence Colony": "Defence Park, Community Garden",
    "Further Extension": "Lakeview Park, Civic Park"
  };
  return demo[name] || 'Local Park, Community Grounds';
}

function getDemoSchools(name) {
  const demo = {
    "Bhartiya City": "Greenwood High, Delhi Public School",
    "Adarsh Palm Retreat": "Inventure Academy, Orchids Int\'l",
    "Defence Colony": "Army Public School, Sophia High",
    "Further Extension": "Baldwin School, Presidency School"
  };
  return demo[name] || 'Govt Primary, Nearby Private School';
}

app.listen(PORT, () => {
  console.log(`✈️ Server running on http://localhost:${PORT}`);
});
