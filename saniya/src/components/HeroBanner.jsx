import React from 'react'
import './HeroBanner.css'

export default function HeroBanner() {
  return (
    <div className='hero-banner'>
        <div className='hero-image'>
            <img src='https://worldjourneys.co.nz/wp-content/uploads/Country-Maldives-1568x1116.jpg' alt='tropical resort' />
        </div>
        <div className='hero-content'>
            <h1>Explore Our Member Offers</h1>
            <p>Not a member? Join today.</p>
            <button className='cta-button'>Book now</button>
        </div>
        
    </div>
  )
}

