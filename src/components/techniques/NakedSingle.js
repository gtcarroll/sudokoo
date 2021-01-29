//import React from "react";

// const NakedSingleComponent = (props) => {
//   return <h2>naked single</h2>;
// };

export const nakedSingle = {
  name: "Naked Single",
  check: (cell, state, showcase) => {
    // count this cell's suspects
    let suspects = 0;
    let soln = -1;
    for (let i = 0; i < cell.notes.length; i++) {
      if (cell.notes[i] > 0) {
        suspects++;
        soln = i + 1;
      }
    }

    // if this cell has only one suspect...
    if (suspects === 1) {
      // ...update affected cell notes,
      for (let aff of state.unsolved.values()) {
        if (
          aff.row === cell.row ||
          aff.col === cell.col ||
          aff.house === cell.house
        ) {
          // remove in state
          state.sudoku.houses[aff.house][aff.room].notes[soln - 1] = 0;
          // cross-out in showcase
          showcase.houses[aff.house][aff.room].notes[soln - 1] = -1;
        }
      }

      // ...set cell value in state,
      state.sudoku.houses[cell.house][cell.room].val = soln;
      state.sudoku.houses[cell.house][cell.room].notes[soln - 1] = 1;
      // ...highlight note value in showcase,
      showcase.houses[cell.house][cell.room].notes[soln - 1] = 2;

      // ...remove from unsolved.
      state.unsolved.splice(state.unsolved.indexOf(cell), 1);
      return showcase;
    }
    return false;
  },
};
