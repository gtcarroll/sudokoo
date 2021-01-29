//import React from "react";

// const PointingTuple = (props) => {
//   return <h2>pointing tuple</h2>;
// };

export const pointingTuple = {
  name: "Pointing Tuple",
  check: (cell, state) => {
    console.log("pointingTuple" + cell + state);
    return 0;
  },
};
