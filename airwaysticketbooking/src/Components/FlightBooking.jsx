import React, { useEffect, useState } from "react";
import { Plane, Calendar, MapIcon, MapPin, PlusCircle } from "lucide-react";
import "./FlightBooking.css";

import Dates from "./Dates";
import ChooseAirport from "./ChooseAirport";
import { CommonAirports } from "./Data/CommonAirports";
import Passengers from "./Passangers";
import TripType from "./TrypType";

const FlightBooking = () => {
  //   State variables for trip type selection
  const [tripType, setTripType] = useState("return");

  //   State variables for date selection
  const [departureDate, setDepartureDate] = useState(null); // State to hold the departure date
  const [returnDate, setReturnDate] = useState(null); // State to hold the return date (optional, for round trips)

  //   State variablesfor for airportselection

  const [selectedAirports, setSelectedAirports] = useState({
    from: null,
    to: null,
  });
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: 1,
    class: "Economy",
  });
  const [showAirportList, setShowAirportList] = useState({
    from: false,
    to: false,
  });
  const [airportSearchQuery, setAirportSearchQuery] = useState({
    from: "",
    to: "",
  });
  const [airports, setAirports] = useState({
    from: CommonAirports,
    to: CommonAirports,
  });

  //Fetch airports from API and searchquery

  useEffect(() => {
    const fetchAirports = async (type) => {
      if (!airportSearchQuery[type]) return;
      try {
        const response = await fetch(
          `https://airport-info.p.rapidapi.com/airport?iata=${airportSearchQuery[type]}`,
          {
            headers: {
              "x-rapidapi-key":
                "7a92070e10msh8b1cb69905e80d3p152393jsna21c41c8f92b",
              "x-rapidapi-host": "airport-info.p.rapidapi.com",
            },
          }
        );
        console.log(response);
        const data = await response.json();
        const formattedData = data.error
          ? []
          : [
              {
                iata: data.iata,
                name: data.name,
                country: data.country,
                city: data.city,
              },
            ];

        const filteredCommonAirports = CommonAirports.filter(
          (airport) =>
            airport.iata
              .toLowerCase()
              .includes(airportSearchQuery[type].toLowerCase()) ||
            airport.name
              .toLowerCase()
              .includes(airportSearchQuery[type].toLowerCase()) ||
            airport.city
              .toLowerCase()
              .includes(airportSearchQuery[type].toLowerCase())
        );

        setAirports((prev) => ({
          ...prev,
          [type]: [...formattedData, ...filteredCommonAirports],
        }));
      } catch (error) {
        console.error("Error fetching airports:", error);
        const filteredCommonAirports = CommonAirports.filter(
          (airport) =>
            airport.iata
              .toLowerCase()
              .includes(airportSearchQuery[type].toLowerCase()) ||
            airport.name
              .toLowerCase()
              .includes(airportSearchQuery[type].toLowerCase()) ||
            airport.city
              .toLowerCase()
              .includes(airportSearchQuery[type].toLowerCase())
        );
        setAirports((prev) => ({
          ...prev,
          [type]: filteredCommonAirports,
        }));
      }
    };

    const timer = setTimeout(() => {
      if (airportSearchQuery.from) fetchAirports("from");
      if (airportSearchQuery.to) fetchAirports("to");
    }, 500);

    return () => clearTimeout(timer);
  }, [airportSearchQuery]);

  // handle airport input change

  const handleAirportInputChange = (type, value) => {
    setAirportSearchQuery((prev) => ({
      ...prev,
      [type]: value,
    }));

    setFormData((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // handleairport swapchange

  const handleSwapAirports = () => {
    setSelectedAirports((prev) => ({
      from: prev.to,
      to: prev.from,
    }));

    setFormData((prev) => ({
      ...prev,
      from: formData.to,
      to: formData.from,
    }));

    setAirportSearchQuery((prev) => ({
      from: airportSearchQuery.to,
      to: airportSearchQuery.from,
    }));
  };

  //selecting airport

  const handleAirportSelect = (type, airport) => {
    setSelectedAirports((prev) => ({
      ...prev,
      [type]: airport,
    }));

    setFormData((prev) => ({
      ...prev,
      [type]: airport.iata,
    }));

    setShowAirportList((prev) => ({
      ...prev,
      [type]: false,
    }));
  };

  //handle tryp type

  const handleTripTypeChange = (newType) => {
    setTripType(newType);
    if (newType === "oneway") {
      setFormData((prev) => ({ ...prev, returnDate: "" }));
      setReturnDate(null);
    }
  };

  //handle form submit
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //handle form submit

  const handleSearch = (e) => {
    e.preventDefault();
    if (
      !formData.from ||
      !formData.to ||
      !formData.departDate ||
      (tripType === "return" && !formData.returnDate)
    ) {
      alert(
        "Please fill in all required fields: departure, destination, and dates."
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    const flightResults = flightsData.filter(
      (flight) =>
        flight.departure_airport === formData.from &&
        flight.arrival_airport === formData.to
    );

    navigate("/flight-results", {
      state: { searchData: formData, tripType, results: flightResults },
    });
  };

  return (
    <div className="booking-container">
      <nav className="booking-nav">
        <div className="nav-item">
          <Plane className="icon" />
          <span>Book a flight</span>
        </div>
        <div className="nav-item">
          <MapIcon className="icon" />
          <span>Stopover / Packages</span>
        </div>
        <div className="nav-item">
          <Calendar className="icon" />
          <span>Manage / Check in</span>
        </div>
        <div className="nav-item">
          <MapPin className="icon" />
          <span>Flight status</span>
        </div>
      </nav>

      {/* Trip Type */}

      <TripType tripType={tripType} onTripTypeChange={handleTripTypeChange} />

      {/* Form */}
      <div className=" form-group booking-form">
        {/* Select Airport */}

        <div className="locations">
          <div className="location-input">
            <ChooseAirport
              type="from"
              selectedAirport={selectedAirports.from}
              searchQuery={airportSearchQuery.from}
              showList={showAirportList.from}
              airports={airports.from}
              onInputChange={handleAirportInputChange}
              onFocus={() =>
                setShowAirportList((prev) => ({ ...prev, from: true }))
              }
              onSelect={handleAirportSelect}
            />
          </div>
          <button
            className="swap-button"
            onClick={handleSwapAirports}
            disabled={isLoading}
          >
            ⇄
          </button>
          <div className="location-input">
            <ChooseAirport
              type="to"
              selectedAirport={selectedAirports.to}
              searchQuery={airportSearchQuery.to}
              showList={showAirportList.to}
              airports={airports.to}
              onInputChange={handleAirportInputChange}
              onFocus={() =>
                setShowAirportList((prev) => ({ ...prev, to: true }))
              }
              onSelect={handleAirportSelect}
            />
          </div>
        </div>

        {/* handle date change */}
        <div className="dates">
          {/* departure Date Picker*/}
          <div className="date-input">
            <label>Departure</label>

            <Dates
              placeholder={"Departure Date"}
              selectedDate={departureDate}
              onDateChange={setDepartureDate}
            />
          </div>

          {/* Return Date Picker (if needed) */}
          <div className="date-input">
            <label>Return</label>

            <Dates
              placeholder={"Return Date"}
              selectedDate={returnDate}
              onDateChange={setReturnDate}
            />
          </div>
        </div>

        {/* Passengers */}

        <Passengers
          passengers={formData.passengers}
          travelClass={formData.class}
          disabled={isLoading}
        />
      </div>

      {/* Actions */}
      {/* <div className="form-actions">
        <button className="promo-button">
          <PlusCircle className="icon" />
          Add promo code
        </button>
        <button className="search-button">Search Flights</button>
      </div> */}

      <div>
      <FormActions onSearch={handleSearch} disabled={isLoading} />
      </div>
    </div>
  );
};

export default FlightBooking;
