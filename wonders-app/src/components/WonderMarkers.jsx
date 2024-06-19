import React from "react";
import { Marker } from "react-leaflet";

const WonderMarkers = (props) => {
  {
    props.wonders.map((wonder, index) => {
      return <Marker key={index} position={[wonder.lat, wonder.lng]} />;
    });
  }
};

export default WonderMarkers;
