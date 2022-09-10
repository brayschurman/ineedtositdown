import React, { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import bench_data from './bench_data.json';


function App() {

  if (!navigator.geolocation) {
    console.error(`Browser doesn't support Geolocation`);
  }

  // const [marker, setMarker] = useState({});

  const [lat, setLat] = useState(43.659457);
  const [lon, setLon] = useState(-79.392073);

  // useEffect(() => {
  //   console.log(marker);
  // }, [marker])

  const plotPosition = (position: any) => {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
  }

  // navigator.geolocation.getCurrentPosition(plotPosition);

  if (!bench_data) {
    console.log("No bench data to display.");
  }

  const randomSpot = () => {
    const item = bench_data.features[Math.floor(Math.random() * bench_data.features.length)];
    console.log(item);
    // setMarker({ lat: item.geometry.coordinates[1], lon: item.geometry.coordinates[0] });
    // setMarker({ coords: [item.geometry.coordinates[0], item.geometry.coordinates[1]] })
    setLon(item.geometry.coordinates[0]);
    setLat(item.geometry.coordinates[1]);
  }

  return (
    <>
      <MapContainer center={[lat, lon]} zoom={14} scrollWheelZoom={false}>
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
      alert(marker);
      <button onClick={randomSpot}>Random</button>
    </>
  );
}

export default App;
