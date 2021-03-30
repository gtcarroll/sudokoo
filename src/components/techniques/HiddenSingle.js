//import React from "react";
import { helper } from "./TechniqueHelper.js";

// const HiddenSingleComponent = (props) => {
//   return <h2>naked single</h2>;
// };

export const hiddenSingle = {
  name: "Hidden Single",
  test: [
    [0, 3, 0, 0, 0, 8, 0, 0, 7],
    [8, 0, 0, 3, 0, 0, 2, 6, 0],
    [0, 0, 0, 0, 2, 9, 8, 3, 4],
    [0, 0, 0, 0, 0, 4, 3, 0, 0],
    [6, 0, 8, 1, 3, 2, 0, 0, 9],
    [0, 0, 3, 0, 0, 0, 0, 0, 0],
    [1, 0, 5, 4, 9, 3, 7, 8, 0],
    [0, 8, 0, 2, 7, 1, 0, 0, 3],
    [3, 0, 7, 8, 0, 0, 0, 1, 0],
  ],
  check: (cell, state) => {
    let axisKeys = Object.keys(cell.pos);

    // for each [row, col, house] this cell belongs to...
    for (let a = 0; a < 3; a++) {
      let unseen = helper.getUnseen(cell, state, axisKeys[a]);

      // ...if this cell suspects a note unseen elsewhere in this axis...
      if (unseen.length > 0) {
        helper.writeSolution(unseen[0], cell, state);
        helper.highlightAxis(state.sudoku, cell, a);
        helper.highlightAxis(state.sudoku, cell, (a + 1) % 3, "tertiary");
        helper.highlightAxis(state.sudoku, cell, (a + 2) % 3, "tertiary");
        return true;
      }
    }
    return false;
  },
};
