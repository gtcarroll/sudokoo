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
      helper.writeSolution(suspects[0], cell, state);
      helper.highlightAxis(state.sudoku, cell, 0, "tertiary");
      helper.highlightAxis(state.sudoku, cell, 1, "tertiary");
      helper.highlightAxis(state.sudoku, cell, 2, "tertiary");
    }
    return suspects.length === 1;
  },
};
