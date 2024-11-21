import React, { useEffect, useState } from 'react'

import './FlightBookingForm.css'
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import TripType from './TripType';
import AirportSelector from './AirportSelector';
import Dates from './Dates';
import Passengers from './Passengers';
import FormActions from './FormActions';
import { commonAirports } from '../Data/Airports';
import { searchFlights } from '../Data/flightService';





export default function FlightBookingForm() {

    const navigate = useNavigate();
  const [tripType, setTripType] = useState('return');
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [selectedAirports, setSelectedAirports] = useState({ from: null, to: null });
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'Economy'
  });
  const [showAirportList, setShowAirportList] = useState({ from: false, to: false });
  const [airportSearchQuery, setAirportSearchQuery] = useState({ from: '', to: '' });
  const [airports, setAirports] = useState({ from: commonAirports, to: commonAirports });

  useEffect(() => {
    const fetchAirports = async (type) => {
      if (!airportSearchQuery[type]) return;
      try {
        const response = await fetch(`https://airport-info.p.rapidapi.com/airport?iata=${airportSearchQuery[type]}`, {
          headers: {
            'x-rapidapi-key': 'dd416eb94dmsh804593d10557feap1c3ebfjsn5f71d084755d',
            'x-rapidapi-host': 'airport-info.p.rapidapi.com'
          }
        });

        const data = await response.json();
        const formattedData = data.error ? [] : [{
          iata: data.iata,
          name: data.name,
          country: data.country,
          city: data.city
        }];

        const filteredCommonAirports = commonAirports.filter(airport =>
          airport.iata.toLowerCase().includes(airportSearchQuery[type].toLowerCase()) ||
          airport.name.toLowerCase().includes(airportSearchQuery[type].toLowerCase()) ||
          airport.city.toLowerCase().includes(airportSearchQuery[type].toLowerCase())
        );

        setAirports(prev => ({
          ...prev,
          [type]: [...formattedData, ...filteredCommonAirports]
        }));
      } catch (error) {
        console.error('Error fetching airports:', error);
        const filteredCommonAirports = commonAirports.filter(airport =>
          airport.iata.toLowerCase().includes(airportSearchQuery[type].toLowerCase()) ||
          airport.name.toLowerCase().includes(airportSearchQuery[type].toLowerCase()) ||
          airport.city.toLowerCase().includes(airportSearchQuery[type].toLowerCase())
        );
        setAirports(prev => ({
          ...prev,
          [type]: filteredCommonAirports
        }));
      }
    };

    const timer = setTimeout(() => {
      if (airportSearchQuery.from) fetchAirports('from');
      if (airportSearchQuery.to) fetchAirports('to');
    }, 500);

    return () => clearTimeout(timer);
  }, [airportSearchQuery]);

  const handleAirportInputChange = (type, value) => {
    setAirportSearchQuery(prev => ({
      ...prev,
      [type]: value
    }));
    
    setFormData(prev => ({
      ...prev,
      [type]: value
    }));
  };

  /* Swap Airport */
  const handleSwapAirports = () => {
    setSelectedAirports(prev => ({
      from: prev.to,
      to: prev.from
    }));
    
    setFormData(prev => ({
      ...prev,
      from: formData.to,
      to: formData.from
    }));
    
    setAirportSearchQuery(prev => ({
      from: airportSearchQuery.to,
      to: airportSearchQuery.from
    }));
  };
  
  const handleAirportSelect = (type, airport) => {
    setSelectedAirports(prev => ({
      ...prev,
      [type]: airport
    }));
    
    setFormData(prev => ({
      ...prev,
      [type]: airport.iata
    }));
    
    setShowAirportList(prev => ({
      ...prev,
      [type]: false
    }));
  };

  /* handle date change */
  const handleDepartDateChange = (date) => {
    setDepartDate(date);
    setFormData(prev => ({
      ...prev,
      departDate: date ? date.toISOString().split('T')[0] : ''
    }));
    
    // If return date is before new depart date, reset return date
    if (returnDate && date > returnDate) {
      setReturnDate(null);
      setFormData(prev => ({
        ...prev,
        returnDate: ''
      }));
    }
  };
  
  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    setFormData(prev => ({
      ...prev,
      returnDate: date ? date.toISOString().split('T')[0] : ''
    }));
  };

  const handleTripTypeChange = (newType) => {
    setTripType(newType);
    if (newType === 'oneway') {
      setFormData(prev => ({ ...prev, returnDate: '' }));
      setReturnDate(null);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async(e) => {
    e.preventDefault();
    if (!formData.from || !formData.to || !formData.departDate || (tripType === 'return' && !formData.returnDate)) {
      alert("Please fill in all required fields: departure, destination, and dates.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const flightResults = await searchFlights({
        from: formData.from,
        to: formData.to,
        departDate: formData.departDate
      });
      

     

      

    navigate('./flight-results', {
      state: {
        searchData: formData,
        tripType: tripType,
        results: flightResults
      }
    });
  }catch (error) {
    alert('Failed to search flights. Please try again.');
    console.error('Error searching flights:', error);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className='booking-container'>
      <Navigation />
      <TripType tripType={tripType} onTripTypeChange={handleTripTypeChange} />
      
      <div className='booking-form'>
      {error && <div className="error-message">{error}</div>}
        <div className='form-group locations'>
          <AirportSelector
            type="from"
            selectedAirport={selectedAirports.from}
            searchQuery={airportSearchQuery.from}
            showList={showAirportList.from}
            airports={airports.from}
            onInputChange={handleAirportInputChange}
            onFocus={() => setShowAirportList({ from: true, to: false })}
            onSelect={handleAirportSelect}
          />
          <button className='swap-button' onClick={handleSwapAirports}disabled={isLoading}>⇄</button>
          <AirportSelector
            type="to"
            selectedAirport={selectedAirports.to}
            searchQuery={airportSearchQuery.to}
            showList={showAirportList.to}
            airports={airports.to}
            onInputChange={handleAirportInputChange}
            onFocus={() => setShowAirportList({ from: false, to: true })}
            onSelect={handleAirportSelect}
          />
        </div>

        <div className='form-group dates'>
          <Dates
            label="Departure"
            selected={departDate}
            onChange={handleDepartDateChange}
            placeholder="Select departure date"
            disabled={isLoading}
          />
          {tripType === 'return' && (
            <Dates
              label="Return"
              selected={returnDate}
              onChange={handleReturnDateChange}
              placeholder="Select return date"
              disabled={isLoading}
            />
          )}
        </div>

        <Passengers
          passengers={formData.passengers}
          travelClass={formData.class}
          disabled={isLoading}
        />
      </div>

      <FormActions onSearch={handleSearch} disabled={isLoading} />
    </div>
  );
};
