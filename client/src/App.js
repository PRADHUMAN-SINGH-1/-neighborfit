import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minSafety, setMinSafety] = useState('');
  const [maxRent, setMaxRent] = useState('');

  // Load data from backend once when component mounts
  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://neighborfit-y283.onrender.com';
  useEffect(() => {
  fetch(`${baseUrl}/api/neighborhoods`)
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.error(err));
}, [baseUrl]); 


  // Apply filters only if values are not empty
  const filteredData = data.filter(item => {
    const rent = parseInt(item.avg_rent) || 0;
    const safety = parseFloat(item.safety_score) || 0;

    const matchesName = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRent = maxRent === '' || rent <= parseInt(maxRent);
    const matchesSafety = minSafety === '' || safety >= parseFloat(minSafety);

    return matchesName && matchesRent && matchesSafety;
  });

  return (
    <div className="App">
      <h1>🏘️ Bengaluru Neighborhoods</h1>

      {/* Filters section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Safety Score"
          value={minSafety}
          onChange={e => setMinSafety(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={e => setMaxRent(e.target.value)}
        />
      </div>

      {/* Cards grid */}
      <div className="grid">
        {filteredData.map((item, idx) => (
          <div key={idx} className="card">
            <h2>{item.name}</h2>
            <p><strong>Ward:</strong> {item.ward}</p>
            {item.population && <p><strong>Population:</strong> {item.population}</p>}

            <p><strong>Safety Score:</strong> {item.safety_score}</p>
            <p><strong>Avg. Rent:</strong> ₹{item.avg_rent}</p>
            <p><strong>Metro Nearby:</strong> {item.metro_nearby_km} km</p>
            <p><strong>🧑‍🏫 Schools Nearby:</strong> {item.schools_nearby}</p>
            <p><strong>🌳 Parks Nearby:</strong> {item.parks_nearby}</p>

            {/* Smart Badges */}
            <div className="badges">
              {parseFloat(item.safety_score) > 7 && <span className="badge safe">Safe</span>}
              {parseFloat(item.metro_nearby_km) < 2 && <span className="badge metro">Metro Nearby</span>}
              {parseInt(item.avg_rent) > 50000 && <span className="badge rent">High Rent</span>}
            </div>

              {item.lifestyle_tags && (
             <div className="lifestyle-tags">
             {item.lifestyle_tags.map((tag, index) => {
               // Tag-based class logic
              let tagClass = '';
              if (tag.includes("Family")) className += " family";
              else if (tag.includes("Working")) className += " professional";
              else if (tag.includes("Quiet")) className += " quiet";
              else if (tag.includes("Walkable")) className += " walkable";

                return (
                <span key={index} className={`badge lifestyle ${tagClass}`}>
                {tag}
                </span>
                );
                 })}
                </div>
                )}



            {/* Google Maps Link */}
            {item.lat && item.lon && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                View on Map
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;