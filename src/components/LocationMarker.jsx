import { Icon } from "@iconify/react";
import fireIcon from "@iconify/icons-mdi/fire-alert";
import storm from "@iconify/icons-mdi/flash-alert";
import volcano from "@iconify/icons-mdi/image-filter-hdr";
import LocationInfoBox from "./LocationInfoBox";
import { useState, useEffect } from "react";

const LocationMarker = ({ lat, lng, onClick, id, title, type }) => {
  const [showBox, setShowBox] = useState(false);
  const [locationIcon, setLocationIcon] = useState();
  const [classColor, setClassColor] = useState();

  useEffect(() => {
    if (type === "wildfire") {
      setLocationIcon(fireIcon);
      setClassColor("wildfire");
    }
    if (type === "storm") {
      setLocationIcon(storm);
      setClassColor("storm");
    }
    if (type === "volcano") {
      setLocationIcon(volcano);
      setClassColor("volcano");
    }
  }, []);

  const showInfoBox = () => {
    setShowBox(!showBox);
  };
  return (
    <div className="location-marker" onClick={showInfoBox}>
      <Icon
        icon={locationIcon}
        className={`${classColor} location-icon ${showBox ? "active" : ""}`}
      />
      {showBox ? <LocationInfoBox id={id} title={title} /> : ""}
    </div>
  );
};

export default LocationMarker;
