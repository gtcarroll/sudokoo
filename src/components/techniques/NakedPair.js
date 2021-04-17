//import React from "react";
import { helper } from "./TechniqueHelper.js";

// const NakedPair = (props) => {
//   return <h2>naked pair</h2>;
// };

export const nakedPair = {
  name: "Naked Pair",
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
    let pair = helper.getSuspects(cell);

    // if this cell has exactly 2 suspects...
    if (pair.length === 2) {
      let affected = [];
      let axisKeys = Object.keys(cell.pos);

      // ...for each [row, col, house] this cell belongs to...
      for (let a = 0; a < 3; a++) {
        let axis = state.sudoku[axisKeys[a] + "s"][cell.pos[axisKeys[a]]];

        // ...for each cell in that axis...
        for (let i = 0; i < 9; i++) {
          let other = axis[i];
          let otherPair = helper.getSuspects(other);
          let wasUpdated = false;

          // ...if that cell is not the same and has exactly the same two suspects...
          if (
            !helper.isSameCell(cell, other) &&
            otherPair.length === 2 &&
            otherPair[0] === pair[0] &&
            otherPair[1] === pair[1]
          ) {
            // ...for each axis the cell's share...
            for (let b = 0; b < 3; b++) {
              if (cell.pos[axisKeys[b]] === other.pos[axisKeys[b]]) {
                let sharedAxis =
                  state.sudoku[axisKeys[b] + "s"][cell.pos[axisKeys[b]]];

                // ...for each cell in that shared axis...
                for (let j = 0; j < 9; j++) {
                  let aff = sharedAxis[j];

                  // ...if that cell is not in this pair...
                  if (
                    !helper.isSameCell(aff, cell) &&
                    !helper.isSameCell(aff, other)
                  ) {
                    // ...push potential changes to cell.
                    let wasUpdated0 = helper.tryRemoving(aff, pair[0]);
                    let wasUpdated1 = helper.tryRemoving(aff, pair[1]);
                    if (wasUpdated0 || wasUpdated1) {
                      affected.push(aff);
                      wasUpdated = true;
                    }
                  }
                }
              }
            }
          }

          // ...if updates to sudoku state were made...
          if (wasUpdated) {
            // ...highlight the naked pair values in state.
            let snapshot = helper.createSnapshot(state.sudoku);

            helper.highlightCell(snapshot, cell);
            helper.highlightCell(snapshot, other);
            helper.highlightNote(snapshot, cell, "primary", pair[0]);
            helper.highlightNote(snapshot, cell, "primary", pair[1]);
            helper.highlightNote(snapshot, other, "primary", pair[0]);
            helper.highlightNote(snapshot, other, "primary", pair[1]);
            helper.fillAxis(snapshot, cell, a, "tertiary");
            helper.highlightUpdates(snapshot, affected, "tertiary", pair[0]);
            helper.highlightUpdates(snapshot, affected, "tertiary", pair[1]);

            return snapshot;
          }
        }
      }
    }
    return false;
  },
};
