//import React from "react";
import { helper } from "./TechniqueHelper.js";

// const NakedSingleComponent = (props) => {
//   return <h2>naked single</h2>;
// };

export const nakedSingle = {
  name: "Naked Single",
  test: [
    [0, 4, 9, 0, 0, 0, 0, 3, 0],
    [0, 5, 0, 6, 1, 0, 0, 0, 0],
    [0, 0, 8, 0, 2, 9, 5, 0, 6],
    [8, 0, 0, 9, 0, 7, 0, 0, 4],
    [7, 0, 0, 0, 0, 0, 0, 8, 1],
    [0, 2, 5, 0, 4, 1, 3, 0, 0],
    [2, 0, 0, 0, 7, 6, 0, 1, 0],
    [5, 0, 0, 4, 0, 8, 7, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 9, 5],
  ],
  check: (cell, state) => {
    let suspects = helper.getSuspects(cell);
    if (suspects.length === 1) {
      let affected = helper.writeSolution(suspects[0], cell, state);
      let snapshot = helper.createSnapshot(state.sudoku);

      helper.highlightCell(snapshot, cell);
      helper.highlightUpdates(snapshot, affected, "tertiary", suspects[0]);

      helper.fillAxis(snapshot, cell, 0, "tertiary");
      helper.fillAxis(snapshot, cell, 1, "tertiary");
      helper.fillAxis(snapshot, cell, 2, "tertiary");

      return snapshot;
    }
    return false;
  },
};
