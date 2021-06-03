import React from "react";
import { helper } from "./TechniqueHelper.js";
import { ReportNode, MiniCell, Pop, Hlt, axesNames } from "../birdfeed";

const NakedTripleReport = (props) => {
  return (
    <div>
      <ReportNode className="primary">
        <MiniCell className="mini-cell" />
        <div className="lead">
          <Pop className="pri">These cells...</Pop>
        </div>
        <div className="text">
          can only be <Pop className="pri">{props.x}</Pop>,{" "}
          <Pop className="pri">{props.y}</Pop> or{" "}
          <Pop className="pri">{props.z}</Pop> and are all in the same{" "}
          <Hlt className="pri">{axesNames[props.a[0]]}</Hlt>
          {props.a.length > 1 && (
            <span>
              {" and "}
              <Hlt className="pri">{axesNames[props.a[1]]}</Hlt>
            </span>
          )}
          . This means that one must be <Pop className="pri">{props.x}</Pop>,
          another must be <Pop className="pri">{props.y}</Pop>, and the last
          must be <Pop className="pri">{props.z}</Pop>.
        </div>
      </ReportNode>
      <ReportNode className="tertiary">
        <MiniCell className="mini-cell">X</MiniCell>
        <div className="lead">
          <Pop className="ter">So, other cells...</Pop>
        </div>
        <div className="text">
          in the same <Hlt className="ter">{axesNames[props.a[0]]}</Hlt>
          {props.a.length > 1 && (
            <span>
              {" or "}
              <Hlt className="ter">{axesNames[props.a[1]]}</Hlt>
            </span>
          )}{" "}
          can't be <Pop className="ter">{props.x}</Pop>,{" "}
          <Pop className="ter">{props.y}</Pop>, or{" "}
          <Pop className="ter">{props.z}</Pop>.
        </div>
      </ReportNode>
    </div>
  );
};
NakedTripleReport.defaultProps = {
  x: 0,
  y: 0,
  z: 0,
  a: 0,
};

export const nakedTriple = {
  name: "Naked Triple",
  test: [
    [8, 0, 7, 0, 0, 3, 0, 2, 0],
    [0, 0, 1, 0, 2, 0, 0, 0, 0],
    [0, 0, 2, 4, 0, 0, 1, 0, 5],
    [0, 1, 0, 0, 7, 2, 0, 0, 6],
    [0, 0, 9, 0, 6, 0, 2, 0, 0],
    [7, 2, 6, 0, 0, 0, 0, 1, 0],
    [2, 0, 3, 0, 0, 6, 0, 0, 0],
    [0, 0, 0, 2, 3, 5, 6, 0, 0],
    [0, 0, 0, 9, 0, 0, 8, 3, 2],
  ],
  getReport: (props) => {
    return NakedTripleReport(props);
  },
  check: (cell, state) => {
    // TODO: add function for finding a triple in an axis if cell has only 2 suspects
    let triple = helper.getSuspects(cell);

    // if this cell has 3 suspects...
    if (triple.length === 3) {
      let affected = [[], [], []];
      let affectedAxes = [];
      let axisKeys = Object.keys(cell.pos);

      // ...for each [row, col, house] this cell belongs to...
      for (let a = 0; a < 3; a++) {
        let wasUpdated = false;
        let axis = state.sudoku[axisKeys[a] + "s"][cell.pos[axisKeys[a]]];
        let others = [cell];

        // ...for each cell in that axis...
        let i = 0;
        while (i < 9) {
          let other = axis[i];
          let otherSuspects = helper.getSuspects(other);

          // ...if that cell is not the same and has a subset of the same 3 suspects...
          if (other.val <= 0 && !helper.isSameCell(others[0], other)) {
            let isSubset = true;

            for (let s = 0; s < otherSuspects.length; s++) {
              if (!triple.includes(otherSuspects[s])) isSubset = false;
            }
            // ...add to list of triples
            if (isSubset) others.push(other);
          }
          i++;
        }

        // ...if there are 3 cells w the same triple...
        if (others.length >= 3) {
          // ...for each axis the cell's share...
          for (let b = 0; b < 3; b++) {
            if (
              others[0].pos[axisKeys[b]] === others[1].pos[axisKeys[b]] &&
              others[1].pos[axisKeys[b]] === others[2].pos[axisKeys[b]]
            ) {
              let sharedAxis =
                state.sudoku[axisKeys[b] + "s"][cell.pos[axisKeys[b]]];

              // ...for each cell in that shared axis...
              for (let j = 0; j < 9; j++) {
                let aff = sharedAxis[j];

                // ...if that cell is not in this triple...
                if (
                  !helper.isSameCell(aff, others[0]) &&
                  !helper.isSameCell(aff, others[1]) &&
                  !helper.isSameCell(aff, others[2])
                ) {
                  // ...push potential changes to cell.
                  for (let t = 0; t < 3; t++) {
                    if (helper.tryRemoving(aff, triple[t])) {
                      affected[t].push(aff);
                      if (!affectedAxes.includes(b)) affectedAxes.push(b);
                      wasUpdated = true;
                    }
                  }
                }
              }
            }
          }

          // ...if updates to sudoku state were made...
          if (wasUpdated) {
            // ...highlight the naked triple values in state.
            let snapshot = helper.createSnapshot(state.sudoku);

            helper.fillAxis(snapshot, cell, a, "tertiary");
            for (let o = 0; o < 3; o++) {
              helper.highlightCell(snapshot, others[o]);
              for (let t = 0; t < 3; t++) {
                if (others[o].notes[triple[t]])
                  helper.highlightNote(
                    snapshot,
                    others[o],
                    "primary",
                    triple[t]
                  );
              }
              helper.highlightUpdates(
                snapshot,
                affected[o],
                "tertiary",
                triple[o]
              );
            }

            snapshot.props = {
              x: triple[0] + 1,
              y: triple[1] + 1,
              z: triple[2] + 1,
              a: affectedAxes,
            };

            return snapshot;
          }
        }
      }
    }
  },
};
