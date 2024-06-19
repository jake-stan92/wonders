import React from "react";
import { haversineDistance } from "../helpers";

const DistanceTable = ({ userLocation, wonders }) => {
  let wondersByDistance = [];
  wonders.map((wonder) => {
    let distanceAway = haversineDistance(
      [userLocation[0], userLocation[1]],
      [wonder.lat, wonder.lng]
    );
    wondersByDistance.push({
      name: wonder.name,
      distanceAway: distanceAway,
    });
  });
  const sortedArray = wondersByDistance.sort(
    (a, b) => a.distanceAway - b.distanceAway
  );
  return (
    <table>
      <tbody>
        <tr>
          <th>Wonder</th>
          <th>Distance Away (km)</th>
        </tr>
        {sortedArray.map((wonder, index) => {
          return (
            <tr key={index}>
              <td>{wonder.name}</td>
              <td>{wonder.distanceAway}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DistanceTable;
