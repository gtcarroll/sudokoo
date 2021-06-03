import React from "react";
import { helper } from "./TechniqueHelper.js";
import { ReportNode, MiniCell, Pop, Hlt, axesNames } from "../birdfeed";

const HiddenSingleReport = (props) => {
  return (
    <div>
      <ReportNode className="primary">
        <MiniCell className="mini-cell solid">{props.x}</MiniCell>
        <div className="lead">
          <Pop className="pri">This cell...</Pop>
        </div>
        <div className="text">
          must be <Pop className="pri">{props.x}</Pop>, because its the only
          possible <Pop className="pri">{props.x}</Pop> in its{" "}
          <Hlt className="pri">{axesNames[props.a]}</Hlt>.
        </div>
      </ReportNode>
      <ReportNode className="tertiary">
        <MiniCell className="mini-cell">X</MiniCell>
        <div className="lead">
          <Pop className="ter">So, other cells...</Pop>
        </div>
        <div className="text">
          in the same <Hlt className="ter">{axesNames[(props.a + 1) % 3]}</Hlt>{" "}
          or <Hlt className="ter">{axesNames[(props.a + 2) % 3]}</Hlt> can't be{" "}
          <Pop className="ter">{props.x}</Pop>.
        </div>
      </ReportNode>
    </div>
  );
};
HiddenSingleReport.defaultProps = {
  x: 0,
  a: 0,
};

export const hiddenSingle = {
  name: "Hidden Single",
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
  getReport: (props) => {
    return HiddenSingleReport(props);
  },
  check: (cell, state) => {
    let axisKeys = Object.keys(cell.pos);

    // for each [row, col, house] this cell belongs to...
    for (let a = 0; a < 3; a++) {
      let unseen = helper.getUnseen(cell, state, axisKeys[a]);

      // ...if this cell suspects a note unseen elsewhere in this axis...
      if (unseen.length > 0) {
        let affected = helper.writeSolution(unseen[0], cell, state);
        let snapshot = helper.createSnapshot(state.sudoku);

        helper.highlightCell(snapshot, cell);
        helper.highlightUpdates(snapshot, affected, "tertiary", unseen[0]);

        helper.fillAxis(snapshot, cell, a);
        helper.fillAxis(snapshot, cell, (a + 1) % 3, "tertiary");
        helper.fillAxis(snapshot, cell, (a + 2) % 3, "tertiary");

        snapshot.props = {
          x: unseen[0] + 1,
          a: a,
        };

        return snapshot;
      }
    }
    return false;
  },
};
