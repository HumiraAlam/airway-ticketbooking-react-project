import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Flights() {

   
        const location = useLocation();
        const navigate = useNavigate();
    
        // Access the user-input data (formData) passed via navigate state from the Search component
        const { from, to } = location.state || {};
    
        const flightData = [
            {
                airline: "Qatar Airways",
                departureTime: "03:30",
                arrivalTime: "13:25",
                stops: "1 Stop, 14h 25m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹249,498",
                fareBusiness: "₹736,532",
                specialOffer: true,
                date: "Fri, 10 Jan 2025"
            },
            {
                airline: "Qatar Airways",
                departureTime: "06:50",
                arrivalTime: "16:10",
                stops: "1 Stop, 13h 20m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹255,320",
                fareBusiness: "₹750,100",
                specialOffer: false,
                date: "Fri, 10 Jan 2025"
            },
            {
                airline: "Qatar Airways",
                departureTime: "10:15",
                arrivalTime: "20:00",
                stops: "2 Stops, 18h 45m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹261,000",
                fareBusiness: "₹780,450",
                specialOffer: true,
                date: "Fri, 10 Jan 2025"
            },
            {
                airline: "Qatar Airways",
                departureTime: "15:00",
                arrivalTime: "01:30 +1",
                stops: "1 Stop, 12h 30m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹248,500",
                fareBusiness: "₹730,300",
                specialOffer: false,
                date: "Fri, 10 Jan 2025"
            },
            {
                airline: "Qatar Airways",
                departureTime: "18:45",
                arrivalTime: "04:30 +1",
                stops: "1 Stop, 12h 45m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹252,200",
                fareBusiness: "₹745,000",
                specialOffer: true,
                date: "Fri, 10 Jan 2025"
            },
            {
                airline: "Qatar Airways",
                departureTime: "22:15",
                arrivalTime: "10:45 +1",
                stops: "2 Stops, 16h 30m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹260,000",
                fareBusiness: "₹790,000",
                specialOffer: false,
                date: "Fri, 10 Jan 2025"
            },
            {
                airline: "Qatar Airways",
                departureTime: "01:30",
                arrivalTime: "11:45",
                stops: "1 Stop, 14h 15m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹247,900",
                fareBusiness: "₹735,000",
                specialOffer: false,
                date: "Fri, 10 Jan 2025"
            },
            {
                airline: "Qatar Airways",
                departureTime: "05:00",
                arrivalTime: "15:30",
                stops: "2 Stops, 16h 30m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹255,000",
                fareBusiness: "₹755,000",
                specialOffer: true,
                date: "Fri, 10 Jan 2025"
            },
            // Additional flights added below
            {
                airline: "Qatar Airways",
                departureTime: "02:45",
                arrivalTime: "12:30",
                stops: "1 Stop, 13h 45m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹248,000",
                fareBusiness: "₹730,000",
                specialOffer: true,
                date: "Fri, 10 Jan 2025"
            },
            {
                airline: "Qatar Airways",
                departureTime: "07:20",
                arrivalTime: "17:00",
                stops: "2 Stops, 14h 40m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹259,500",
                fareBusiness: "₹765,300",
                specialOffer: false,
                date: "Fri, 10 Jan 2025"
            },
            {
                airline: "Qatar Airways",
                departureTime: "12:00",
                arrivalTime: "23:50",
                stops: "1 Stop, 15h 50m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹257,000",
                fareBusiness: "₹760,000",
                specialOffer: true,
                date: "Fri, 10 Jan 2025"
            },
            {
                airline: "Qatar Airways",
                departureTime: "19:30",
                arrivalTime: "06:15 +1",
                stops: "2 Stops, 16h 45m",
                from: "HYD",
                to: "ARN",
                fareEconomy: "₹265,000",
                fareBusiness: "₹780,500",
                specialOffer: false,
                date: "Fri, 10 Jan 2025"
            }
        ];
        const handleSelectFlight = (flight) => {
            navigate('/passenger-details', { state: { selectedFlightDetails: flight } });
        };

  return (
    <div>
        <div className="results-container">
            <div className="header">
                <h1>Select your departure flight</h1>
                {/* Display the "from" and "to" values from the form */}
                <p className="route">from <span>{from || "Hyderabad"}</span> to <span>{to || "Stockholm"}</span></p>
            </div>

            <div className="date-selector">
                <button className="date-option">Tue, 7 Jan ₹262,752</button>
                <button className="date-option">Wed, 8 Jan ₹239,442</button>
                <button className="date-option">Thu, 9 Jan ₹200,184</button>
                <button className="date-option active">Fri, 10 Jan ₹219,712</button>
                <button className="date-option">Sat, 11 Jan ₹246,320</button>
                <button className="date-option">Sun, 12 Jan ₹194,466</button>
                <button className="date-option">Mon, 13 Jan ₹159,092</button>
            </div>

            <p className="results-count">8 results</p>
            <p className="fare-info">Fares displayed are for all passengers.</p>

            <div className="flights-list">
                {flightData.map((flight, index) => (
                    <div className="flight-card" key={index}>
                        <div className="flight-details">
                            <div className="timing">
                                <p><strong>{flight.departureTime}</strong> — <strong>{flight.arrivalTime}</strong></p>
                                <p>{flight.stops}</p>
                            </div>
                            <div className="route-info">
                                <p>{flight.from}</p>
                                <span>→</span>
                                <p>{flight.to}</p>
                            </div>
                        </div>
                        <div className="fare-section">
                            <div className="fare economy">
                                <p>Economy</p>
                                <p className="fare-amount">{flight.fareEconomy}</p>
                            </div>
                            <div className="fare business">
                                <p>Business</p>
                                <p className="fare-amount">{flight.fareBusiness}</p>
                                {flight.specialOffer && <p className="special-offer">Special offer</p>}
                            </div>
                        </div>
                        <button className="select-button" onClick={() => handleSelectFlight(flight)}>Select</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
