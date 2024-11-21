import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const PassengerCounter = ({ label, value, onChange, min, max }) => (
  <div className="control-row">
    <label className="counter-label">{label}</label>
    <div className="counter-container">
      <button
        className="counter-button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
      >
        -
      </button>
      <span className="counter-value">{value}</span>
      <button
        className="counter-button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  </div>
);

export default function Passengers({ onPassengerChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    adults: 1,
    children: 0,
    class: "Economy",
  });

  const classes = ["Economy", "Premium Economy", "Business", "First"];
  const totalPassengers = formData.adults + formData.children;

  const handleAdultChange = (value) => {
    if (value >= 1 && value <= 9) {
      const newFormData = { ...formData, adults: value };
      setFormData(newFormData);
      onPassengerChange?.(newFormData);
    }
  };

  const handleChildChange = (value) => {
    if (value >= 0 && value <= 8) {
      const newFormData = { ...formData, children: value };
      setFormData(newFormData);
      onPassengerChange?.(newFormData);
    }
  };

  const handleClassSelect = (selectedClass) => {
    const newFormData = { ...formData, class: selectedClass };
    setFormData(newFormData);
    onPassengerChange?.(newFormData);
    setIsOpen(false);
  };
  return (
    <div className="form-group passengers">
      <div className="passenger-selector">
        <div>
          <label className="main-label">Passenger/class</label>
          <button
            className="selector-button"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            <span>
              {totalPassengers} Passenger{totalPassengers !== 1 ? "s" : ""} -{" "}
              {formData.class}
            </span>
            <ChevronDown className="chevron-icon" />
          </button>
        </div>

        {isOpen && (
          <div className="dropdown">
            <div className="dropdown-content">
              <PassengerCounter
                label="Adults"
                value={formData.adults}
                onChange={handleAdultChange}
                min={1}
                max={9}
              />
              <PassengerCounter
                label="Children"
                value={formData.children}
                onChange={handleChildChange}
                min={0}
                max={8}
              />
              <div className="class-section">
                <label className="class-label">Class</label>
                {classes.map((travelClass) => (
                  <div
                    key={travelClass}
                    className={`class-option ${
                      formData.class === travelClass ? "selected" : ""
                    }`}
                    onClick={() => handleClassSelect(travelClass)}
                  >
                    {travelClass}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
