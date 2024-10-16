import React ,{useState}from 'react'
import Header from './Header'
import Home from "./Home"
import Location from './Components/Location'
function App() {
  var[searchLocation,setSearchLocation] = useState("");
  var[locationName,setLocationName] = useState([]);
  var [cordinates, setCordinates] = useState({lat:"17.4485835",lng:"78.39080349999999"})
  const [popularRest, setPopularRest] = useState([]);


  return (
  <>
    <Header/>
    <Location searchLocation={searchLocation} setSearchLocation={setSearchLocation} locationName={locationName} setLocationName={setLocationName} cordinates={cordinates} setCordinates={setCordinates} popularRest={popularRest} setPopularRest={setPopularRest}/>
    <Home cordinates={cordinates} setCordinates={setCordinates} popularRest={popularRest} setPopularRest={setPopularRest}/>
  </>
  )
}

export default App