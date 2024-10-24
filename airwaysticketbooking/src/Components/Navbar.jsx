import React from 'react'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src="/assets/logo.png" alt="Qatar Airways" />
        </div>
        <ul className="nav-links">
          <li>
            <a href="#">Book</a>
          </li>
          <li>
            <a href="#">Travel Info</a>
          </li>
          <li>
            <a href="#">Privilege Club</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
        </ul>
      </nav>

    </div>
  )
}
