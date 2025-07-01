import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NeighborhoodList.css';

function NeighborhoodList() {
  // State to hold neighborhood data
  const [neighborhoods, setNeighborhoods] = useState([]);

  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [minSafety, setMinSafety] = useState(0);
  const [maxRent, setMaxRent] = useState(100000);

  // Fetch data on mount
  useEffect(() => {
    axios.get('http://localhost:5050/api/neighborhoods')
      .then(response => setNeighborhoods(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Filtered data based on search + filters
  const filteredNeighborhoods = neighborhoods.filter(n => {
    const rent = parseInt(n.avg_rent) || 0;
    const safety = parseFloat(n.safety_score) || 0;
    return (
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      rent <= maxRent &&
      safety >= minSafety
    );
  });

  return (
    <div className="neighborhood-container">
      <h1 className="heading">🏘️ Bengaluru Neighborhoods</h1>

      {/* Filter bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name..."
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

      {/* Card grid */}
      <div className="card-grid">
        {filteredNeighborhoods.map((n, i) => (
          <div key={i} className="card">
            <h2>{n.name}</h2>
            <p><strong>Ward:</strong> {n.ward || 'N/A'}</p>
            <p><strong>Safety Score:</strong> {n.safety_score || 'N/A'}</p>
            <p><strong>Avg. Rent:</strong> ₹{n.avg_rent || 'N/A'}</p>
            <p><strong>Metro Nearby:</strong> {n.metro_nearby_km || 'N/A'} km</p>
            <p><strong>Schools:</strong> {n.schools_nearby || 'N/A'}</p>
            <p><strong>Parks:</strong> {n.parks_nearby || 'N/A'}</p>
            <p><strong>Population:</strong> {n.population || 'N/A'}</p>

             

            {/* Smart tags */}
            <div className="tags">
              {parseFloat(n.safety_score) > 7 && <span className="badge safe">Safe</span>}
              {parseFloat(n.metro_nearby_km) < 2 && <span className="badge metro">Metro Nearby</span>}
              {parseInt(n.avg_rent) > 50000 && <span className="badge rent">High Rent</span>}

              {/* Lifestyle Tags */}
              {n.lifestyle_tags && n.lifestyle_tags.map((tag, i) => {
               let className = 'badge ';
              if (tag.includes("Family")) className += 'family';
              else if (tag.includes("Professionals")) className += 'professionals';
              else if (tag.includes("Quiet")) className += 'quiet';
              else if (tag.includes("Walkable")) className += 'walkable';

              return <span key={i} className={className}>{tag}</span>;
              })}
            </div>

            {/* Google Map link */}
            {n.lat && n.lon && (
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${n.lat},${n.lon}`} 
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

export default NeighborhoodList;