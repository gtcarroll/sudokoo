//import React from "react";

// const LockedCandidate = (props) => {
//   return <h2>locked candidate</h2>;
// };

export const lockedCandidate = {
  name: "Locked Candidate",
  check: (cell, state) => {
    console.log("lockedCandidate" + cell + state);
    return 0;
  },
};
