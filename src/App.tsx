import React, { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import bench_data from './bench_data.json';


function App() {

  if (!navigator.geolocation) {
    console.error(`Browser doesn't support Geolocation`);
  }

  // const [marker, setMarker] = useState({});

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const [centerLat, setCenterLat] = useState(43.659457);
  const [centerLon, setCenterLon] = useState(-79.392073);

  // useEffect(() => {
  //   console.log(marker);
  // }, [marker])

  const plotPosition = (position: any) => {
    setCenterLat(position.coords.latitude);
    setCenterLon(position.coords.longitude);
  }

  navigator.geolocation.getCurrentPosition(plotPosition);

  if (!bench_data) {
    console.log("No bench data to display.");
  }

  const randomSpot = () => {
    const item = bench_data.features[Math.floor(Math.random() * bench_data.features.length)];
    console.log(item);
    setLon(item.geometry.coordinates[0]);
    setLat(item.geometry.coordinates[1]);

    setCenterLon(item.geometry.coordinates[0]);
    setCenterLat(item.geometry.coordinates[1]);
  }

  return (
    <>
      <MapContainer center={[centerLat, centerLon]} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <button onClick={randomSpot}>Random</button>
    </>
  );
}

export default App;
