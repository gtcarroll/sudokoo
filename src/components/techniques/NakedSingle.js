import React from "react";
import { helper } from "./TechniqueHelper.js";
import { ReportNode, MiniCell, Pop, Hlt } from "../birdfeed";

const NakedSingleReport = (props) => {
  return (
    <div>
      <ReportNode className="primary">
        <MiniCell className="mini-cell solid">{props.x}</MiniCell>
        <div className="lead">
          <Pop className="pri">This cell...</Pop>
        </div>
        <div className="text">
          must be <Pop className="pri">{props.x}</Pop>, because that is its only
          remaining option.
          {/* must be <Pop className="pri">{props.x}</Pop>, because its only
          remaining suspect is <Pop className="pri">{props.x}</Pop>. */}
        </div>
      </ReportNode>
      <ReportNode className="tertiary">
        <MiniCell className="mini-cell">X</MiniCell>
        <div className="lead">
          <Pop className="ter">So, other cells...</Pop>
        </div>
        <div className="text">
          in the same <Hlt className="ter">house</Hlt>,{" "}
          <Hlt className="ter">row</Hlt>, or <Hlt className="ter">column</Hlt>{" "}
          must not be <Pop className="ter">{props.x}</Pop>.
        </div>
      </ReportNode>
    </div>
  );
};
NakedSingleReport.defaultProps = {
  x: 0,
};

export const nakedSingle = {
  name: "Naked Single",
  test: [
    [0, 4, 9, 0, 0, 0, 0, 3, 0],
    [0, 5, 0, 6, 1, 0, 0, 0, 0],
    [0, 0, 8, 0, 2, 9, 5, 0, 6],
    [8, 0, 0, 9, 0, 7, 0, 0, 4],
    [7, 0, 0, 0, 0, 0, 0, 8, 1],
    [0, 2, 5, 0, 4, 1, 3, 0, 0],
    [2, 0, 0, 0, 7, 6, 0, 1, 0],
    [5, 0, 0, 4, 0, 8, 7, 0, 0],
    [0, 8, 7, 0, 0, 0, 0, 9, 5],
  ],
  getReport: (soln) => {
    return NakedSingleReport(soln);
  },
  check: (cell, state) => {
    let suspects = helper.getSuspects(cell);
    if (suspects.length === 1) {
      let affected = helper.writeSolution(suspects[0], cell, state);
      let snapshot = helper.createSnapshot(state.sudoku);

      helper.highlightCell(snapshot, cell);
      helper.highlightUpdates(snapshot, affected, "tertiary", suspects[0]);

      helper.fillAxis(snapshot, cell, 0, "tertiary");
      helper.fillAxis(snapshot, cell, 1, "tertiary");
      helper.fillAxis(snapshot, cell, 2, "tertiary");

      snapshot.props = {
        x: suspects[0] + 1,
      };

      return snapshot;
    }
    return false;
  },
};
