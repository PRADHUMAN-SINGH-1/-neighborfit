import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minSafety, setMinSafety] = useState('');
  const [maxRent, setMaxRent] = useState('');

  const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://neighborfit-y283.onrender.com';

  useEffect(() => {
    fetch(`${baseUrl}/api/neighborhoods`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, [baseUrl]);

  const filteredData = data.filter(item => {
    const rent = parseInt(item.avg_rent) || 0;
    const safety = parseFloat(item.safety_score) || 0;
    const matchesName = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRent = maxRent === '' || rent <= parseInt(maxRent);
    const matchesSafety = minSafety === '' || safety >= parseFloat(minSafety);
    return matchesName && matchesRent && matchesSafety;
  });

  // 👉 Function to generate lifestyle tags
  const getLifestyleTags = (item) => {
    const tags = [];
    const rent = parseInt(item.avg_rent) || 0;
    const safety = parseFloat(item.safety_score) || 0;
    const parks = parseInt(item.parks_nearby) || 0;
    const schools = parseInt(item.schools_nearby) || 0;
    const metro = parseFloat(item.metro_nearby_km) || 99;

    if (parks >= 3 && schools >= 3) tags.push('Family Friendly');
    if (rent < 20000) tags.push('Affordable');
    if (metro < 2) tags.push('Urban Vibe');
    if (rent > 50000 && safety > 8) tags.push('Premium');

    return tags;
  };

  return (
    <div className="App">
      <h1>🏘️ Bengaluru Neighborhoods</h1>

      {/* Filters */}
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

      {/* Grid */}
      <div className="grid">
        {filteredData.map((item, idx) => (
          <div key={idx} className="card">
            <h2>{item.name}</h2>
            <p><strong>Ward:</strong> {item.ward || 'N/A'}</p>
            <p><strong>Safety Score:</strong> {item.safety_score || 'N/A'}</p>
            <p><strong>Avg. Rent:</strong> ₹{item.avg_rent || 'N/A'}</p>
            <p><strong>Metro Nearby:</strong> {item.metro_nearby_km || 'N/A'} km</p>
            <p><strong>🧑‍🏫 Schools Nearby:</strong> {item.schools_nearby || 'N/A'}</p>
            <p><strong>🌳 Parks Nearby:</strong> {item.parks_nearby || 'N/A'}</p>

            {/* Smart Badges */}
            <div className="badges">
              {parseFloat(item.safety_score) > 7 && <span className="badge safe">Safe</span>}
              {parseFloat(item.metro_nearby_km) < 2 && <span className="badge metro">Metro Nearby</span>}
              {parseInt(item.avg_rent) > 50000 && <span className="badge rent">High Rent</span>}
            </div>

            {/* Lifestyle Tags */}
            <div className="lifestyle-tags">
              {getLifestyleTags(item).map((tag, i) => (
                <span key={i} className="badge lifestyle">{tag}</span>
              ))}
            </div>

            {/* Map link */}
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
