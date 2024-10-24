import React from "react";
import "./Home.css"; // CSS for styling

export default function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Qatar Airways</h1>
          <p>Travel the world with comfort and luxury</p>
          <div className="search-bar">
            <input type="text" placeholder="From" />
            <input type="text" placeholder="To" />
            <button>Search Flights</button>
          </div>
        </div>
      </section>

      {/* Informational Section */}
      <section className="info-section">
        <div className="info-card">
          <h3>Special Offers</h3>
          <p>Check out the latest offers to popular destinations.</p>
        </div>
        <div className="info-card">
          <h3>Privilege Club</h3>
          <p>Join our loyalty program to enjoy exclusive benefits.</p>
        </div>
        <div className="info-card">
          <h3>Travel Safety</h3>
          <p>
            Your safety is our priority. Learn about our enhanced safety
            measures.
          </p>
        </div>
      </section>
    </div>
  );
}
