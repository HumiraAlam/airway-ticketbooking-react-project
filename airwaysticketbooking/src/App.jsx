import React from "react";
import Navbar from "./Components/Navbar";
import HomeBanner from "./Components/HomeBanner";
import "./App.css";
import FlightBooking from "./Components/FlightBooking";

function App() {
  return (
    <div>
      <Navbar />
      <HomeBanner />
      <FlightBooking/>
    </div>
  );
}

export default App;
