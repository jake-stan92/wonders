import "./App.css";
import { React, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import DistanceTable from "./components/DistanceTable";
import WonderMarkers from "./components/WonderMarkers";

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
  // const home = [52.635011951730206, -2.2876563383618107];
  const [userLocation, setUserLocation] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
      setUserLocation([position.coords.latitude, position.coords.longitude]);
      console.log(userLocation);
    }

    function error() {
      setUserLocation([51.501104002528095, -0.1096490382108894]);
      console.log("Unable to retrieve your location");
      console.log(userLocation);
    }
  }, []);

  return (
    <>
      {userLocation.length > 1 && (
        <>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={2}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={userLocation}></Marker>
            <WonderMarkers wonders={wonders} userLocation={userLocation} />
          </MapContainer>
          <DistanceTable wonders={wonders} userLocation={userLocation} />
        </>
      )}
    </>
  );
};

export default App;
