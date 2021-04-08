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

  addBorders: (cell, borders, color = "primary") => {
    if (!cell.borders[color].set) {
      cell.borders[color] = borders;
      cell.borders[color].set = true;
    } else {
      for (let i = 0; i < 4; i++) {
        cell.borders[color][i] &= borders[i];
      }
    }
  },

  highlightRow: (sudoku, row, color = "primary") => {
    let cells = sudoku.rows[row];

    helper.addBorders(cells[0], [true, false, true, true], color);
    for (let i = 1; i < 8; i++)
      helper.addBorders(cells[i], [true, false, true, false], color);
    helper.addBorders(cells[8], [true, true, true, false], color);
  },

  highlightCol: (sudoku, col, color = "primary") => {
    let cells = sudoku.cols[col];

    helper.addBorders(cells[0], [true, true, false, true], color);
    for (let i = 1; i < 8; i++)
      helper.addBorders(cells[i], [false, true, false, true], color);
    helper.addBorders(cells[8], [false, true, true, true], color);
  },

  highlightHouse: (sudoku, house, color = "primary") => {
    let cells = sudoku.houses[house];

    helper.addBorders(cells[0], [true, false, false, true], color);
    helper.addBorders(cells[1], [true, false, false, false], color);
    helper.addBorders(cells[2], [true, true, false, false], color);
    helper.addBorders(cells[3], [false, false, false, true], color);
    helper.addBorders(cells[4], [false, false, false, false], color);
    helper.addBorders(cells[5], [false, true, false, false], color);
    helper.addBorders(cells[6], [false, false, true, true], color);
    helper.addBorders(cells[7], [false, false, true, false], color);
    helper.addBorders(cells[8], [false, true, true, false], color);
  },

  highlightAxis: (sudoku, cell, a, color = "primary") => {
    if (a === 0) helper.highlightRow(sudoku, cell.pos.row, color);
    if (a === 1) helper.highlightCol(sudoku, cell.pos.col, color);
    if (a === 2) helper.highlightHouse(sudoku, cell.pos.house, color);
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

  createSnapshot: (sudoku) => {
    let copy = {
      rows: helper.buildEmpty2DArray(),
      cols: helper.buildEmpty2DArray(),
      houses: helper.buildEmpty2DArray(),
    };
    for (let h = 0; h < 9; h++) {
      for (let r = 0; r < 9; r++) {
        let y = 3 * Math.floor(h / 3) + Math.floor(r / 3);
        let x = 3 * (h % 3) + (r % 3);

        // create cell object
        var cell = helper.copyCell(sudoku.houses[h][r]);

        // store cell in each state object
        copy.houses[h][r] = cell;
        copy.rows[y][x] = cell;
        copy.cols[x][y] = cell;
      }
    }
    return copy;
  },

  // TODO: eliminate redundancy of this method existing both here and in SudokuController
  buildEmpty2DArray: () => {
    var result = new Array(9);
    for (let i = 0; i < 9; i++) {
      result[i] = new Array(9);
    }
    return result;
  },

  copyCell: (cell) => {
    return {
      pos: {
        row: cell.pos.row,
        col: cell.pos.col,
        house: cell.pos.house,
        room: cell.pos.room,
      },
      val: cell.val,
      preset: cell.preset,
      notes: [...cell.notes],
      borders: {
        primary: [...cell.borders.primary],
        secondary: [...cell.borders.secondary],
        tertiary: [...cell.borders.tertiary],
      },
    };
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
