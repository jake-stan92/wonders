import "./App.css";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const App = () => {
  const wonders = [
    {
      name: "Great Wall Of China",
      lat: 40.431908,
      lng: 116.570374,
    },
    {
      name: "Petra",
      lat: 30.32896,
      lng: 35.444832,
    },
    {
      name: "Coliseum",
      lat: 41.890209,
      lng: 12.492231,
    },
    {
      name: "Chichen Itza",
      lat: 20.682593,
      lng: -88.572498,
    },
    {
      name: "Machu Picchu",
      lat: -13.163068,
      lng: -72.545128,
    },
    {
      name: "Taj Mahal",
      lat: 27.173891,
      lng: 78.042068,
    },
    {
      name: "Christ The Redeemer",
      lat: 22.9519,
      lng: 43.2105,
    },
  ];
  return (
    <>
      <MapContainer center={[51.505, -0.09]} zoom={1} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {wonders.map((wonder, index) => {
          return (
            <Marker key={index} position={[wonder.lat, wonder.lng]}>
              <Popup>{wonder.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default App;
