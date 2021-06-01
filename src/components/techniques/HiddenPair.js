import React from "react";
import { helper } from "./TechniqueHelper.js";
import { ReportNode, MiniCell, Pop, Hlt, axesNames } from "../birdfeed";

const HiddenPairReport = (props) => {
  return (
    <div>
      <ReportNode className="primary">
        <MiniCell className="mini-cell" />
        <div className="lead">
          <Pop className="pri">These cells...</Pop>
        </div>
        <div className="text">
          are the only cells that can be <Pop className="pri">{props.x}</Pop> or{" "}
          <Pop className="pri">{props.y}</Pop> in their{" "}
          <Hlt className="pri">{axesNames[props.a]}</Hlt>. This means that one
          must be <Pop className="pri">{props.x}</Pop> and the other must be{" "}
          <Pop className="pri">{props.y}</Pop>, so we can rule out any of their
          other options.
        </div>
      </ReportNode>
      {props.b.length > 0 && (
        <ReportNode className="tertiary">
          <MiniCell className="mini-cell">X</MiniCell>
          <div className="lead">
            <Pop className="ter">Also, other cells...</Pop>
          </div>
          <div className="text">
            in the same <Hlt className="ter">{axesNames[props.b[0]]}</Hlt> must
            not be <Pop className="ter">{props.x}</Pop> or{" "}
            <Pop className="ter">{props.y}</Pop>.
          </div>
        </ReportNode>
      )}
    </div>
  );
};
HiddenPairReport.defaultProps = {
  x: 0,
  y: 0,
  a: 0,
  b: 0,
};

export const hiddenPair = {
  name: "Hidden Pair",
  test: [
    [1, 0, 0, 0, 7, 2, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 1, 0, 7],
    [0, 0, 7, 4, 0, 0, 3, 2, 0],
    [0, 0, 9, 2, 0, 0, 7, 6, 0],
    [2, 7, 1, 3, 0, 6, 5, 0, 0],
    [0, 6, 0, 0, 0, 7, 2, 3, 0],
    [7, 0, 2, 0, 0, 8, 6, 0, 3],
    [4, 0, 5, 6, 2, 0, 0, 7, 0],
    [0, 0, 0, 7, 0, 0, 0, 0, 2],
  ],
  getReport: (props) => {
    return HiddenPairReport(props);
  },
  check: (cell, state) => {
    let suspects = helper.getSuspects(cell);
    // if this cell has more than 1 suspect...
    if (suspects.length >= 2) {
      let axisKeys = Object.keys(cell.pos);
      let wasUpdated = false;
      let affected0 = [];
      let affected1 = [];
      let affectedCell = [];
      let affectedOther = [];
      let affectedAxes = [];
      // ...for each [row, col, house] this cell belongs to...
      for (let a = 0; a < 3; a++) {
        let axis = state.sudoku[axisKeys[a] + "s"][cell.pos[axisKeys[a]]];
        let numsSeenTwice = [];
        let suspectCounts = new Map();
        suspects.forEach((suspect) => {
          suspectCounts.set(suspect, 0);
        });

        // ...count suspect occurances in this axis...
        for (let i = 0; i < 9; i++) {
          let other = axis[i];
          if (other.val <= 0) {
            helper.getSuspects(other).forEach((suspect) => {
              if (suspectCounts.has(suspect))
                suspectCounts.set(suspect, suspectCounts.get(suspect) + 1);
            });
          }
        }
        for (let [k, v] of suspectCounts.entries()) {
          if (v === 2) numsSeenTwice.push(k);
        }

        // ...if at least 2 suspects occur exactly twice...
        if (numsSeenTwice.length >= 2) {
          // ...see if another cell in this axis shares at least 2 of those suspects...
          for (let i = 0; i < 9; i++) {
            let other = axis[i];
            if (other.val <= 0 && !helper.isSameCell(cell, other)) {
              let intersection = helper
                .getSuspects(other)
                .filter((suspect) => numsSeenTwice.includes(suspect));

              if (intersection.length >= 2) {
                // Hidden Pair found!
                let pair = [intersection[0], intersection[1]];

                // remove other suspects from these cells...
                for (let i = 0; i < 9; i++) {
                  if (i !== pair[0] && i !== pair[1]) {
                    if (cell.notes[i]) {
                      wasUpdated = true;
                      cell.notes[i] = false;
                      affectedCell.push(i);
                    }
                    if (other.notes[i]) {
                      wasUpdated = true;
                      other.notes[i] = false;
                      affectedOther.push(i);
                    }
                  }
                }

                // remove members of pair from suspects in shared axes...
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
                        if (helper.tryRemoving(aff, pair[0])) {
                          affected0.push(aff);
                          if (!affectedAxes.includes(b)) affectedAxes.push(b);
                          wasUpdated = true;
                        }
                        if (helper.tryRemoving(aff, pair[1])) {
                          affected1.push(aff);
                          if (!affectedAxes.includes(b)) affectedAxes.push(b);
                          wasUpdated = true;
                        }
                      }
                    }
                  }
                }

                if (wasUpdated) {
                  // ...highlight the naked pair values in state.
                  let snapshot = helper.createSnapshot(state.sudoku);

                  affectedCell.forEach((note) => {
                    helper.highlightNote(snapshot, cell, "tertiary", note);
                  });
                  affectedOther.forEach((note) => {
                    helper.highlightNote(snapshot, other, "tertiary", note);
                  });
                  helper.fillAxis(snapshot, cell, a, "primary");
                  if (affectedAxes.length > 0)
                    helper.fillAxis(
                      snapshot,
                      cell,
                      affectedAxes[0],
                      "tertiary"
                    );
                  helper.highlightUpdates(
                    snapshot,
                    affected0,
                    "tertiary",
                    pair[0]
                  );
                  helper.highlightUpdates(
                    snapshot,
                    affected1,
                    "tertiary",
                    pair[1]
                  );
                  helper.highlightCell(snapshot, cell);
                  helper.highlightCell(snapshot, other);
                  helper.highlightNote(snapshot, cell, "primary", pair[0]);
                  helper.highlightNote(snapshot, cell, "primary", pair[1]);
                  helper.highlightNote(snapshot, other, "primary", pair[0]);
                  helper.highlightNote(snapshot, other, "primary", pair[1]);

                  snapshot.props = {
                    x: pair[0] + 1,
                    y: pair[1] + 1,
                    a: a,
                    b: affectedAxes,
                  };

                  return snapshot;
                }
              }
            }
          }
        }
      }

      return false;
    }
  },
};
