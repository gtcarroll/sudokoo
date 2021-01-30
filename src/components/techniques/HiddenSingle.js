//import React from "react";

// const HiddenSingleComponent = (props) => {
//   return <h2>naked single</h2>;
// };

export const hiddenSingle = {
  name: "Hidden Single",
  check: (cell, state, showcase) => {
    // TODO: simplify this behavior, perhaps w helper fxns
    let axes = [state.sudoku.rows, state.sudoku.cols, state.sudoku.houses];
    let indexes = [cell.row, cell.col, cell.house];

    // for each axis (row, col, house) this cell belongs to...
    for (let a = 0; a < 3; a++) {
      let axis = axes[a][indexes[a]];
      let unseen = [];
      for (let i = 0; i < cell.notes.length; i++) {
        if (cell.notes[i] > 0) unseen.push(i + 1);
      }

      // ...for each cell in that axis...
      for (let i = 0; i < 9; i++) {
        let other = axis[i];
        let isSameCell = cell.col === other.col && cell.row === other.row;

        // ...remove its suspects from our unseen list.
        if (!isSameCell && other.val === 0) {
          // ...remove its suspects from our unseen list.
          for (let i = 0; i < other.notes.length; i++) {
            if (other.notes[i] > 0 && unseen.includes(i + 1)) {
              unseen.splice(unseen.indexOf(i + 1), 1);
            }
          }
        }
      }

      // ...if there is any value remaining in our unseen list...
      if (unseen.length > 0) {
        let soln = unseen[0];

        // ...update affected cell notes,
        for (let aff of state.unsolved) {
          if (
            aff.row === cell.row ||
            aff.col === cell.col ||
            aff.house === cell.house
          ) {
            if (aff.notes[soln - 1] > 0) {
              // remove in state
              aff.notes[soln - 1] = 0;
              // cross-out in showcase
              showcase.houses[aff.house][aff.room].notes[soln - 1] = -1;
            }
          }
        }

        // ...set cell val to soln in state,
        state.sudoku.houses[cell.house][cell.room].val = soln;
        state.sudoku.houses[cell.house][cell.room].notes[soln - 1] = 1;
        // ...highlight soln value in showcase,
        showcase.houses[cell.house][cell.room].notes[soln - 1] = 2;

        // ...remove from unsolved.
        state.unsolved.splice(state.unsolved.indexOf(cell), 1);
        return showcase;
      }
    }
    return false;
  },
};
