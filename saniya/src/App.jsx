import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import FlightBookingForm from './components/FlightBookingForm'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <HeroBanner/>
     <FlightBookingForm/>
    </>
  )
}

export default App
