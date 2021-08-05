import Map from "./components/Map";
import { useState, useEffect } from "react";
import Loader from './components/Loader'

function App() {
  const [eventData, setEventData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect( async () => {
      setLoading(true)
      const res = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
      const { events } = await res.json();

      setEventData(events)
      console.log(events)
      setLoading(false)
  }, [])

  return (
    <div>
    { !loading ? <Map eventData={eventData} /> : <Loader /> }
    </div>
      
  );
}

export default App;
