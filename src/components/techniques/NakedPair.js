import React, { useState } from "react";
import styled from "styled-components";
import { helper } from "./TechniqueHelper.js";
import { colors, animation } from "../../params.js";
import { ReportNode, MiniCell, Pop, Hlt, axesNames } from "../birdfeed";

const NakedPairReport = (props) => {
  return (
    <div>
      <ReportNode className="primary">
        <MiniCell className="mini-cell" />
        <div className="lead">
          <Pop className="pri">These cells...</Pop>
        </div>
        <div className="text">
          can only be <Pop className="pri">{props.x}</Pop> or{" "}
          <Pop className="pri">{props.y}</Pop> and are both in the same{" "}
          <Hlt className="pri">{axesNames[props.a]}</Hlt>. This means that one
          must be <Pop className="pri">{props.x}</Pop> and the other must be{" "}
          <Pop className="pri">{props.y}</Pop>.
        </div>
      </ReportNode>
      <ReportNode className="tertiary">
        <MiniCell className="mini-cell" />
        <div className="lead">
          <Pop className="ter">So, other cells...</Pop>
        </div>
        <div className="text">
          in the same <Hlt className="ter">{axesNames[props.a]}</Hlt> must not
          be <Pop className="ter">{props.x}</Pop> or{" "}
          <Pop className="ter">{props.y}</Pop>.
        </div>
      </ReportNode>
    </div>
  );
};
NakedPairReport.defaultProps = {
  x: 0,
  y: 0,
  a: 0,
};

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
  report: (props) => {
    return NakedPairReport(props);
  },
  check: (cell, state) => {
    let pair = helper.getSuspects(cell);

    // if this cell has exactly 2 suspects...
    if (pair.length === 2) {
      let affected0 = [];
      let affected1 = [];
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
                    if (helper.tryRemoving(aff, pair[0])) {
                      affected0.push(aff);
                      wasUpdated = true;
                    }
                    if (helper.tryRemoving(aff, pair[1])) {
                      affected1.push(aff);
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
            helper.highlightUpdates(snapshot, affected0, "tertiary", pair[0]);
            helper.highlightUpdates(snapshot, affected1, "tertiary", pair[1]);

            snapshot.props = {
              x: pair[0] + 1,
              y: pair[1] + 1,
              a: a,
            };

            return snapshot;
          }
        }
      }
    }
    return false;
  },
};
