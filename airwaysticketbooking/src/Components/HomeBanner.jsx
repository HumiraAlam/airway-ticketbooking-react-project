import React from "react";
import "./Homebanner.css";

export default function HomeBanner() {
  return (
    <div className="home-banner">
      <div className="home-content">
        <h1>Explore Our Member Offers</h1>
        <p>Not a member? Join today.</p>
        <button className="home-button">Book now</button>
      </div>
    </div>
  );
}
