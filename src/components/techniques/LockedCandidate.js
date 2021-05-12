import React from "react";
import { helper } from "./TechniqueHelper.js";
import { ReportNode, MiniCell, Pop, Hlt, axesNames } from "../birdfeed";

const LockedCandidateReport = (props) => {
  return (
    <div>
      <ReportNode className="primary">
        <MiniCell className="mini-cell" />
        <div className="lead">
          <Pop className="pri">These cells...</Pop>
        </div>
        <div className="text">
          are the only cells that can be <Pop className="pri">{props.x}</Pop> in
          their <Hlt className="pri">{axesNames[props.a]}</Hlt>. This means that
          one of them must be <Pop className="pri">{props.x}</Pop>. Since they
          also share a <Hlt className="ter">house</Hlt> together...
        </div>
      </ReportNode>
      <ReportNode className="tertiary">
        <MiniCell className="mini-cell">X</MiniCell>
        <div className="lead">
          <Pop className="ter">other cells...</Pop>
        </div>
        <div className="text">
          in the same <Hlt className="ter">house</Hlt> must not be{" "}
          <Pop className="ter">{props.x}</Pop>.
        </div>
      </ReportNode>
    </div>
  );
};
LockedCandidateReport.defaultProps = {
  x: 0,
  a: 0,
};

export const lockedCandidate = {
  name: "Locked Candidate",
  test: [
    [1, 2, 0, 0, 9, 0, 0, 6, 0],
    [6, 0, 3, 1, 4, 0, 0, 9, 2],
    [4, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 3, 0, 0, 1, 4, 2, 0, 0],
    [2, 0, 4, 0, 7, 0, 0, 0, 0],
    [0, 0, 6, 0, 2, 0, 0, 3, 0],
    [0, 0, 1, 2, 0, 0, 0, 4, 8],
    [0, 4, 0, 0, 0, 1, 7, 2, 0],
    [0, 6, 2, 4, 3, 0, 1, 5, 9],
  ],
  getReport: (props) => {
    return LockedCandidateReport(props);
  },
  check: (cell, state) => {
    let axisKeys = Object.keys(cell.pos);
    let indexes = [cell.pos.row, cell.pos.col];

    // for each axis (row and col) this cell belongs to...
    for (let a = 0; a < 2; a++) {
      let affected = [];
      let proof = [];
      let soln = 0;
      let wasUpdated = false;
      let diffHouse = (c1, c2) => {
        return c1.pos.house !== c2.pos.house;
      };
      let unseen = helper.getUnseen(cell, state, axisKeys[a], diffHouse);

      // ...if there are any unseen suspects left...
      if (unseen.length > 0) {
        soln = unseen[0];
        let notOnlyOne = false;
        for (let r = 0; r < 9; r++) {
          let roomie = state.sudoku.houses[cell.pos.house][r];
          notOnlyOne |=
            r !== cell.pos.room &&
            roomie.val <= 0 &&
            roomie.notes[soln] &&
            unseen.includes(soln);
        }
        // ...if this cell is not the only one in its axis and house w soln in suspects...
        if (notOnlyOne) {
          // ...for each other unsolved cell in the same house...
          for (let r = 0; r < 9; r++) {
            if (r !== cell.pos.room) {
              let aff = state.sudoku.houses[cell.pos.house][r];
              let affIndexes = [aff.pos.row, aff.pos.col];

              // ...if aff would be affected and is not in the same axis as cell...
              if (
                aff.val <= 0 &&
                aff.notes[soln] &&
                affIndexes[a] !== indexes[a]
              ) {
                wasUpdated = true;

                // ...remove the soln from that cell's suspects.
                //TODO:
                //   -turn Note "off"
                //   -mark Note to animate this snapshot only
                aff.notes[soln] = false;
                affected.push(aff);
              }
            }
          }

          if (wasUpdated) {
            for (let r = 0; r < 9; r++) {
              let aff = state.sudoku.houses[cell.pos.house][r];
              let affIndexes = [aff.pos.row, aff.pos.col];

              // ...if aff would be affected and is in the same axis as cell...
              if (
                aff.val <= 0 &&
                aff.notes[soln] &&
                affIndexes[a] === indexes[a]
              ) {
                // ...highlight the soln val in state.
                proof.push(aff);
              }
            }
          }
        }
      }
      // ...if updates to sudoku state were made, return them
      if (wasUpdated) {
        let snapshot = helper.createSnapshot(state.sudoku);

        helper.highlightUpdates(snapshot, proof, "primary", soln);
        helper.highlightUpdates(snapshot, affected, "tertiary", soln);

        helper.fillAxis(snapshot, cell, a);
        helper.fillAxis(snapshot, cell, 2, "tertiary");

        snapshot.props = {
          x: soln + 1,
          a: a,
        };

        return snapshot;
      }
    }
    return false;
  },
};
