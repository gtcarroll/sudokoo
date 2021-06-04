import React from "react";
import { helper } from "./TechniqueHelper.js";
import { ReportNode, MiniCell, Pop, Hlt, axesNames } from "../birdfeed";
import { colors } from "../../params.js";

const XWingReport = (props) => {
  return (
    <div>
      <ReportNode className="primary">
        <MiniCell className="mini-cell" />
        <div className="lead">
          <Pop className="pri">These cells...</Pop>
        </div>
        <div className="text">
          are the only possible{" "}
          <Pop className="pri">
            {props.x}
            <span style={{ color: colors.neutral5 }}>s</span>
          </Pop>{" "}
          in their <Hlt className="pri">{axesNames[props.a]}s</Hlt>. This means
          that one in each <Hlt className="pri">{axesNames[props.a]}</Hlt> must
          be <Pop className="pri">{props.x}</Pop>. Since they also share the
          same two <Hlt className="pri">{axesNames[props.b]}s</Hlt>...
        </div>
      </ReportNode>
      <ReportNode className="tertiary">
        <MiniCell className="mini-cell">X</MiniCell>
        <div className="lead">
          <Pop className="ter">other cells...</Pop>
        </div>
        <div className="text">
          in those two <Hlt className="ter">{axesNames[props.b]}s</Hlt> can't be{" "}
          <Pop className="ter">{props.x}</Pop>.
        </div>
      </ReportNode>
    </div>
  );
};
XWingReport.defaultProps = {
  x: 0,
  a: 0,
  b: 0,
};

export const xWing = {
  name: "X-Wing",
  test: [
    [7, 0, 0, 0, 0, 0, 9, 3, 0],
    [0, 9, 0, 0, 0, 0, 8, 7, 1],
    [0, 0, 0, 7, 9, 1, 0, 4, 0],
    [0, 2, 0, 0, 0, 3, 0, 0, 9],
    [5, 0, 0, 0, 0, 9, 1, 0, 3],
    [3, 0, 9, 6, 0, 0, 7, 2, 0],
    [9, 5, 0, 4, 6, 0, 0, 1, 0],
    [2, 0, 6, 9, 0, 0, 0, 5, 0],
    [0, 4, 0, 0, 0, 0, 6, 9, 7],
  ],
  getReport: (props) => {
    return XWingReport(props);
  },
  check: (cell, state) => {
    let suspects = helper.getSuspects(cell);

    // if this cell has more than 1 suspect...
    if (suspects.length >= 2) {
      let axisKeys = Object.keys(cell.pos);

      // ...for each [row, col] this cell belongs to...
      for (let a = 0; a < 2; a++) {
        let axisSet = state.sudoku[axisKeys[a] + "s"];
        let axis = axisSet[cell.pos[axisKeys[a]]];
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

        for (let n = 0; n < numsSeenTwice.length; n++) {
          let targetAxes = [cell.pos[axisKeys[(a + 1) % 2]]];
          let num = numsSeenTwice[n];
          let i = 0;

          // find the axis of the other member of this pair
          while (i < 9 || targetAxes.length === 1) {
            let other = axis[i];
            if (
              other.val <= 0 &&
              !helper.isSameCell(cell, other) &&
              other.notes[num]
            ) {
              targetAxes.push(other.pos[axisKeys[(a + 1) % 2]]);
            }
            i++;
          }

          for (let b = 0; b < 9; b++) {
            if (b !== cell.pos[axisKeys[a]]) {
              let parallelAxis = axisSet[b];
              let parallelCells = [
                parallelAxis[targetAxes[0]],
                parallelAxis[targetAxes[1]],
              ];

              let numMatch = true;
              parallelCells.forEach((pCell) => {
                numMatch &= pCell.val <= 0 && pCell.notes[num];
              });

              if (numMatch) {
                // make sure no other occurances of num in parallelAxis
                let onlyTwo = true;
                for (let j = 0; j < 9 && onlyTwo; j++) {
                  let other = parallelAxis[j];
                  if (
                    other.val <= 0 &&
                    j !== targetAxes[0] &&
                    j !== targetAxes[1] &&
                    other.notes[num]
                  ) {
                    onlyTwo = false;
                  }
                }

                if (onlyTwo) {
                  // see if can remove from perpendicular axis
                  let crossAxes = [cell.pos[axisKeys[a]], b];
                  let wasUpdated = false;
                  let affected = [];

                  let perpendicularAxisSet =
                    state.sudoku[axisKeys[(a + 1) % 2] + "s"];
                  for (let t = 0; t < targetAxes.length; t++) {
                    let perpendicularAxis = perpendicularAxisSet[targetAxes[t]];

                    for (let j = 0; j < perpendicularAxis.length; j++) {
                      if (j !== crossAxes[0] && j !== crossAxes[1]) {
                        let aff = perpendicularAxis[j];
                        if (helper.tryRemoving(aff, num)) {
                          affected.push(aff);
                          wasUpdated = true;
                        }
                      }
                    }
                  }

                  if (wasUpdated) {
                    // ...highlight the naked pair values in state.
                    let snapshot = helper.createSnapshot(state.sudoku);
                    let oppositeCell = null;

                    targetAxes.forEach((t) => {
                      crossAxes.forEach((c) => {
                        let cornerCell = axisSet[c][t];
                        helper.highlightCell(snapshot, cornerCell);
                        helper.highlightNote(
                          snapshot,
                          cornerCell,
                          "primary",
                          num
                        );
                        if (
                          cornerCell.pos.row !== cell.pos.row &&
                          cornerCell.pos.col !== cell.pos.col
                        ) {
                          oppositeCell = cornerCell;
                        }
                      });
                    });

                    helper.fillAxis(snapshot, cell, a);
                    helper.fillAxis(snapshot, oppositeCell, a);
                    helper.fillAxis(snapshot, cell, (a + 1) % 2, "tertiary");
                    helper.fillAxis(
                      snapshot,
                      oppositeCell,
                      (a + 1) % 2,
                      "tertiary"
                    );
                    helper.highlightUpdates(
                      snapshot,
                      affected,
                      "tertiary",
                      num
                    );

                    snapshot.props = {
                      x: num + 1,
                      a: a,
                      b: (a + 1) % 2,
                    };

                    return snapshot;
                  }
                }
              }
            }
          }
        }
      }
    }
    return false;
  },
};
