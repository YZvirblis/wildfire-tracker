const LocationInfoBox = ({ id, title }) => {
  return (
    <div className="location-info">
      <h6>X</h6>
      <h2>Event Location Info</h2>
      <ul>
        <li>
          ID: <strong>{id}</strong>
        </li>
        <li>
          TITLE: <strong>{title}</strong>
        </li>
      </ul>
    </div>
  );
};

export default LocationInfoBox;
