import React from "react";
import "./Navbar.css"; // CSS for styling
import { Flag, FlagIcon, Globe, Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="navbar">
      <img src="/assets/logo.svg" className="navbar-logo" />
      <img src="/assets/oneworld_logo.svg" className="navbar-logo" />
      <ul className="navbar-links">
        <li>Explore</li>
        <li>Book</li>
        <li>Experience</li>
        <li>Privilege Club</li>
      </ul>
      <div className="navbar-icons">
        <Search />
        <span>Help</span>
        <Globe />
        <span>EN</span>
        <User />
        <span>Log in | Sign up</span>
      </div>
    </div>
  );
}
