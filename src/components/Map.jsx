import GoogleMapReact from "google-map-react"
import LocationMarker from "./LocationMarker"
import LocationInfoBox from "./LocationInfoBox";
import { useState } from "react";

const Map = ({ eventData, center, zoom}) => {
    const [locationInfo, setLocationInfo] = useState(null)

    const markers = eventData.map(ev => {
        if(ev.categories[0].id === 8){
            return <LocationMarker
            lat={ev.geometries[0].coordinates[1]}
            lng={ev.geometries[0].coordinates[0]}
            // onclick={() => setLocationInfo({
            //     id: ev.id, 
            //     title: ev.title,
            //     source: ev.sources[0].url})}
                />
        }
        return null

    })
    return (
        <div className='map'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCgzgF-S3CN_QCT5YKe581BGM413_jhBbA'}}
                defaultCenter={ center }
                defaultZoom ={ zoom }
            >
                {markers}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    )
}

Map.defaultProps = {
    center: {
        lat:32.052823095947545,
        lng:34.77213640695015
    },
    zoom: 15
}

export default Map
