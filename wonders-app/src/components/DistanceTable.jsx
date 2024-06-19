import React from "react";

const DistanceTable = (props) => {
  const sortedArray = props.wondersByDistance.sort(
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
