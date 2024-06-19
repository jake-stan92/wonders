import "./App.css";
import { React, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
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
  let wondersByDistance = [];

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

  /**
   * Calculates the haversine distance between point A, and B.
   * @param {number[]} latlngA [lat, lng] point A
   * @param {number[]} latlngB [lat, lng] point B
   * @param {boolean} isMiles If we are using miles, else km.
   */
  const haversineDistance = (homecoord, [lat2, lon2], isMiles = false) => {
    const toRadian = (angle) => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371;

    const dLat = distance(lat2, homecoord[0]);
    const dLon = distance(lon2, homecoord[1]);

    homecoord[0] = toRadian(homecoord[0]);
    lat2 = toRadian(lat2);

    // Haversine Formula
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(homecoord[0]) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = (RADIUS_OF_EARTH_IN_KM * c).toFixed(2);

    if (isMiles) {
      finalDistance /= 1.60934;
    }

    return finalDistance;
  };

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
            {/* {wonders.map((wonder, index) => {
              return <Marker key={index} position={[wonder.lat, wonder.lng]} />;
            })} */}
            <WonderMarkers wonders={wonders} />
            {/* // func below causing markers to move? */}
            {wonders.map((wonder, index) => {
              let distanceAway = haversineDistance(
                [userLocation[0], userLocation[1]],
                [wonder.lat, wonder.lng]
              );
              wondersByDistance.push({
                name: wonder.name,
                distanceAway: distanceAway,
              });
              return (
                <Marker key={index} position={[wonder.lat, wonder.lng]}>
                  <Popup>
                    {wonder.name}
                    <br></br>
                    {/* Distance: {distanceAway} */}
                    km
                  </Popup>
                  <Polyline
                    positions={[userLocation, [wonder.lat, wonder.lng]]}
                  ></Polyline>
                </Marker>
              );
            })}
          </MapContainer>
          <DistanceTable wondersByDistance={wondersByDistance} />
        </>
      )}
    </>
  );
};

export default App;
