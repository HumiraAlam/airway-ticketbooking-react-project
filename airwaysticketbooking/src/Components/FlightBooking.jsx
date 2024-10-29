import React, { useState } from 'react'
import { Plane, Calendar, MapIcon, MapPin, ChevronDown, PlusCircle,} from 'lucide-react'
import './FlightBooking.css'


export default function FlightBooking() {

    const [tripType, setTripType] = useState('return');

  return (
    <div className='booking-container'>
        <nav className='booking-nav'>
            <div className='nav-item'>
                <Plane className='icon'/>
                <span>Book a flight</span>

            </div>
            <div className='nav-item'>
                <MapIcon className='icon' />
                <span>Stopover / Packages</span>
            </div>
            <div className='nav-item'>
                <Calendar className='icon'/>
                <span>Manage / Check in</span>
            </div>
            <div className='nav-item'>
                <MapPin className='icon'/>
                <span>Flight status</span>
            </div>

        </nav>


        {/* Trip Type */}

        <div className='trip-types'>
            <label className='trip-type'>
                <input type='radio' name='tipType' value='return'
                checked={tripType === 'return'}
                onChange={(e) => setTripType(e.target.value)} />
                <span>Return</span>
            </label>
            <label className='trip-type'>
                <input type='radio' name='tipType' value='oneway'
                checked={tripType === 'oneway'}
                onChange={(e) => setTripType(e.target.value)} />
                <span>One way</span>
            </label>
            <label className='trip-type'>
                <input type='radio' name='tipType' value='multicity'
                checked={tripType === 'multicity'}
                onChange={(e) => setTripType(e.target.value)} />
                <span>Multi-city</span>
            </label>
        </div>


        {/* Form */}
        <div className='booking-form'>
            {/* Locations */}
            <div className='form-group locations'>
                <div className='location-input'>
                    <label>From</label>
                    <input type='text' placeholder='Select Departure'/>
                </div>
                <button className='swap-button'>⇄</button>
                <div className='location-input'>
                    <label>To</label>
                    <input type='text' placeholder='Select Destination'/>
                </div>
            </div>


            {/* Dates */}
            <div className='form-group dates'>
                <div className='date-input'>
                    <label>Departure</label>
                    <div className='date-value'>29 Oct 2024
                    <Calendar className='icon' />
                    </div>
                    
                </div>
                {tripType ==='return' && (
                <div className='date-input'>
                    <label>Return</label>
                    <div className='date-value'>4 Nov 2024
                    <Calendar className='icon'/>
                    </div>
                    
                </div>
                )}
            </div>


            {/* Passengers */}
            <div className='form-group passengers'>
                <label>Passengers / Class</label>
                <div className='passenger-selector'>
                    <span>1 Passenger Economy</span>
                    <ChevronDown className='icon' />
                </div>
            </div>
        </div>

        {/* Actions */}
        <div className='form-actions'>
            <button className='promo-button'>
                <PlusCircle className='icon'/>
                Add promo code
            </button>
            <button className='search-button'>Search flights</button>
        </div>
    </div>
  )
}
