import React from 'react'
import { Search, Globe, User } from 'lucide-react';
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className='navbar'>
        <div className='navbar-container'>
            <div className='navbar-left'>
                <img src= "https://download.logo.wine/logo/Qatar_Airways/Qatar_Airways-Logo.wine.png" alt='Qatar Airways logo' className='navbar-logo'/>
                <div className='navbar-links'>
                    <a href='#'>Explore</a>
                    <a href='#'>Book</a>
                    <a href='#'>Experience</a>
                    <a href='#'>Privilege Club</a>
                    <a href='#'>Help</a>

                </div>
            </div>
            <div className='navbar-right'>
               <Search className='nav-icon' />
               <div className='language-selector'>
                <Globe className='language-selector'/>
                <span>EN</span>
               </div> 
               <div className='auth-section'>
                <User className='nav-icon'/>
                <span>Log in | Sign up</span>
               </div>
            </div>
        </div>
    </nav>
  )
}
