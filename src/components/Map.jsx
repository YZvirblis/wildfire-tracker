import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";

const Map = ({ eventData, center, zoom }) => {
  const markers = eventData.map((ev) => {
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
    return null;
  });
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCgzgF-S3CN_QCT5YKe581BGM413_jhBbA" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 32.052823095947545,
    lng: 34.77213640695015,
  },
  zoom: 15,
};

export default Map;
