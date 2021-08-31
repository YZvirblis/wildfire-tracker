import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import fireIcon from "@iconify/icons-mdi/fire-alert";
import storm from "@iconify/icons-mdi/flash-alert";
import volcano from "@iconify/icons-mdi/image-filter-hdr";
import map from "@iconify/icons-mdi/map-marker-multiple";
import { Icon } from "@iconify/react";
import { useState } from "react";

const Map = ({ eventData }) => {
  const [showFires, setShowFires] = useState(true);
  const [showStorms, setShowStorms] = useState(true);
  const [showVolcanos, setShowVolcanos] = useState(true);
  const { REACT_APP_KEY } = process.env;

  const handleFires = () => setShowFires(!showFires);
  const handleStorms = () => setShowStorms(!showStorms);
  const handleVolcanos = () => setShowVolcanos(!showVolcanos);
  const handleAll = () => {
    setShowFires(true);
    setShowStorms(true);
    setShowVolcanos(true);
  };

  let lat = 0;
  let lng = 0;
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
  });
  const markers = eventData.map((ev) => {
    if (showFires) {
      if (ev.categories[0].id === 8) {
        return (
          <LocationMarker
            lat={ev.geometries[0].coordinates[1]}
            lng={ev.geometries[0].coordinates[0]}
            id={ev.id}
            title={ev.title}
            type="wildfire"
          />
        );
      }
    }
    if (showStorms) {
      if (ev.categories[0].id === 10) {
        return (
          <LocationMarker
            lat={ev.geometries[0].coordinates[1]}
            lng={ev.geometries[0].coordinates[0]}
            id={ev.id}
            title={ev.title}
            type="storm"
          />
        );
      }
    }
    if (showVolcanos) {
      if (ev.categories[0].id === 12) {
        if (ev.id === "EONET_354") {
        }
        if (ev.geometries[0].coordinates[0].length > 1) {
          return (
            <LocationMarker
              lat={ev.geometries[0].coordinates[0][0][1]}
              lng={ev.geometries[0].coordinates[0][0][0]}
              id={ev.id}
              title={ev.title}
              type="volcano"
            />
          );
        }
        return (
          <LocationMarker
            lat={ev.geometries[0].coordinates[1]}
            lng={ev.geometries[0].coordinates[0]}
            id={ev.id}
            title={ev.title}
            type="volcano"
          />
        );
      }
    }
    return null;
  });
  return (
    <div className="map">
      <div className="filter-wrapper">
        <h3>Display Filter:</h3>
        <ul>
          <div onClick={handleAll} className="filter-li">
            <li>
              <div className={`marker`}></div>
              <Icon icon={map} className={` `} />
              All Events
            </li>
          </div>
          <div onClick={handleFires} className={`filter-li`}>
            <li>
              <div className={`marker ${showFires ? "isActive" : ""}`}></div>
              <Icon icon={fireIcon} className={`wildfire `} />
              Wildfires
            </li>
          </div>
          <div onClick={handleStorms} className="filter-li">
            <li>
              <div className={`marker ${showStorms ? "isActive" : ""}`}></div>
              <Icon icon={storm} className={`storm `} />
              Severe Storms
            </li>
          </div>
          <div onClick={handleVolcanos} className="filter-li">
            <li>
              <div className={`marker ${showVolcanos ? "isActive" : ""}`}></div>
              <Icon icon={volcano} className={`volcano `} />
              Volcanos
            </li>
          </div>
        </ul>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ REACT_APP_KEY }}
        defaultCenter={{ lat: lat, lng: lng }}
        defaultZoom={2}
        className="map"
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
