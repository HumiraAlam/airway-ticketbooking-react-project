import React from 'react';

export default function ChooseAirport({
    type,
    selectedAirport,
    searchQuery,
    showList,
    airports,
    onInputChange,
    onFocus,
    onSelect 
}) {
    // Filter airports based on the search query
    const filteredAirports = airports.filter(airport =>
        airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airport.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='location-input'>
            <label>{type === 'from' ? 'From' : 'To'}</label>
            <input
                type='text'
                value={selectedAirport ? `${selectedAirport.iata} - ${selectedAirport.name}` : searchQuery}
                onChange={(e) => onInputChange(type, e.target.value)}
                onFocus={() => onFocus(type)}
                placeholder={`Select ${type === 'from' ? 'departure' : 'destination'}`}
            />
            {showList && filteredAirports.length > 0 && (
                <div className='airport-list-container'>
                    <ul>
                        {filteredAirports.map((airport, index) => (
                            <li key={index} onClick={() => onSelect(type, airport)}>
                                {airport.iata} - {airport.name} ({airport.city})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}