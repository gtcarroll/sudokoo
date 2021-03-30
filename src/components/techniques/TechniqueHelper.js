export const helper = {
  // returns an array of cell's suspects
  getSuspects: (cell) => {
    let suspects = [];
    for (let i = 0; i < cell.notes.length; i++)
      if (cell.notes[i] > 0) suspects.push(i);
    return suspects;
  },

  // returns whether c1 and c2 are the same cell
  isSameCell: (c1, c2) => {
    return c1.pos.row === c2.pos.row && c1.pos.col === c2.pos.col;
  },

  // returns whether the note in cell was able to be removed
  tryRemoving: (cell, note) => {
    let isAffected = cell.val <= 0 && cell.notes[note] > 0;
    if (isAffected) helper.removeNote(note, cell);
    return isAffected;
  },

  addBorders: (cell, borders) => {
    console.log(cell.borderSet);
    if (!cell.borderSet) {
      cell.borders = borders;
      cell.borderSet = true;
    } else {
      for (let i = 0; i < 4; i++) {
        cell.borders[i] &= borders[i];
      }
    }
  },

  highlightRow: (sudoku, row) => {
    let cells = sudoku.rows[row];
    console.log(row);

    // first cell
    helper.addBorders(cells[0], [true, false, true, true]);
    // middle cells
    for (let i = 1; i < 8; i++)
      helper.addBorders(cells[i], [true, false, true, false]);
    // last cell
    helper.addBorders(cells[8], [true, true, true, false]);
  },

  highlightCol: (sudoku, col) => {
    let cells = sudoku.cols[col];
    console.log(col);

    // first cell
    helper.addBorders(cells[0], [true, true, false, true]);
    // middle cells
    for (let i = 1; i < 8; i++)
      helper.addBorders(cells[i], [false, true, false, true]);
    // last cell
    helper.addBorders(cells[8], [false, true, true, true]);
  },

  highlightHouse: (sudoku, house) => {
    let cells = sudoku.houses[house];
    console.log(house);

    helper.addBorders(cells[0], [true, false, false, true]);
    helper.addBorders(cells[1], [true, false, false, false]);
    helper.addBorders(cells[2], [true, true, false, false]);
    helper.addBorders(cells[3], [false, false, false, true]);
    helper.addBorders(cells[4], [false, false, false, false]);
    helper.addBorders(cells[5], [false, true, false, false]);
    helper.addBorders(cells[6], [false, false, true, true]);
    helper.addBorders(cells[7], [false, false, true, false]);
    helper.addBorders(cells[8], [false, true, true, false]);
  },

  highlightAxis: (sudoku, cell, a) => {
    if (a == 0) helper.highlightRow(sudoku, cell.pos.row);
    if (a == 1) helper.highlightCol(sudoku, cell.pos.col);
    if (a == 2) helper.highlightHouse(sudoku, cell.pos.house);
  },

  // TODO: test that this works and consider something less hacky
  highlightNote: (note, cell) => {
    helper.setNote(note, cell, 2, 3);
  },

  removeNote: (note, cell) => {
    helper.setNote(note, cell, -1, -2);
  },

  setNote: (note, cell, v1, v2) => {
    cell.notes[note] = cell.notes[note] === v1 ? v2 : v1;
  },

  // writes cell's soln and consequent updates to state
  writeSolution: (soln, cell, state) => {
    // set value of solved cell in state
    state.sudoku.houses[cell.pos.house][cell.pos.room].val = soln + 1;
    // remove solved cell from unsolved list
    state.unsolved.splice(state.unsolved.indexOf(cell), 1);
    // update all affected cell notes
    for (let aff of state.unsolved) {
      if (
        (aff.pos.row === cell.pos.row ||
          aff.pos.col === cell.pos.col ||
          aff.pos.house === cell.pos.house) &&
        aff.notes[soln] > 0
      ) {
        aff.notes[soln] = -1;
      }
    }
  },

  getUnseen: (
    cell,
    state,
    axisKey,
    compareTest = () => {
      return true;
    }
  ) => {
    let unseen = helper.getSuspects(cell);
    let axis = state.sudoku[axisKey + "s"][cell.pos[axisKey]];

    // for each other cell in this axis...
    for (let i = 0; i < 9; i++) {
      let other = axis[i];

      // ...if it is still unset and is not the same cell...
      if (
        other.val <= 0 &&
        !helper.isSameCell(cell, other) &&
        compareTest(cell, other)
      ) {
        // ...remove its suspects from the unseen list.
        for (let n = 0; n < 9; n++) {
          if (other.notes[n] > 0 && unseen.includes(n)) {
            unseen.splice(unseen.indexOf(n), 1);
          }
        }
      }
    }

    return unseen;
  },
};
