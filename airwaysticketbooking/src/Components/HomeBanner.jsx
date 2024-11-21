import React from "react";
import "./Homebanner.css";

export default function HomeBanner() {
  return (
    <div className="home-banner">
      <div className="home-content">
        <h1>Explore Our Member Offers</h1>
        <p>Not a member? Join today.</p>
        <a
          href="#"
          class="home-button"
          aria-label="Book now"
          target="_self"
          role="button"
        >
          Book now
        </a>
        
      </div>
    </div>
  );
}
