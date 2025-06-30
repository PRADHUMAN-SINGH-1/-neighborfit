import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minSafety, setMinSafety] = useState(0);
  const [maxRent, setMaxRent] = useState(100000);

  // Load data from backend once when component mounts
  useEffect(() => {
  fetch(`${baseUrl}/api/neighborhoods`)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.error(err));
}, [baseUrl]); 


  // Filter neighborhoods by search + filters
  const filteredData = data.filter(item => {
    const rent = parseInt(item.avg_rent) || 0;
    const safety = parseFloat(item.safety_score) || 0;

    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      rent <= maxRent &&
      safety >= minSafety
    );
  });

  return (
    <div className="App">
      <h1>🏡 Bengaluru Neighborhoods</h1>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Safety Score"
          value={minSafety}
          onChange={(e) => setMinSafety(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
        />
      </div>

      {/* Grid of cards */}
      <div className="grid">
        {filteredData.map((item, idx) => (
          <div key={idx} className="card">
            <h2>{item.name}</h2>
            <p><strong>Ward:</strong> {item.ward}</p>
            <p><strong>Population:</strong> {item.population}</p>
            <p><strong>Safety Score:</strong> {item.safety_score}</p>
            <p><strong>Avg. Rent:</strong> ₹{item.avg_rent}</p>
            <p><strong>Metro Nearby:</strong> {item.metro_nearby_km} km</p>
            <p><strong>Parks Nearby:</strong> {item.parks_nearby}</p>
            <p><strong>Schools Nearby:</strong> {item.schools_nearby}</p>

            {/* Smart Badges */}
            <div className="badges">
              {parseFloat(item.safety_score) > 7 && <span className="badge safe">✅ Safe</span>}
              {parseFloat(item.metro_nearby_km) < 2 && <span className="badge metro">🚇 Metro Nearby</span>}
              {parseInt(item.avg_rent) > 50000 && <span className="badge rent">💸 High Rent</span>}
            </div>

            {/* Google Map link if lat/lon exists */}
            {item.lat && item.lon && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                🗺️ View on Map
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
