import React, { useState } from "react";
import styled from "styled-components";
import { helper } from "./TechniqueHelper.js";
import { colors, animation } from "../../params.js";
import { ReportNode, MiniCell, Pop, Hlt } from "../birdfeed";

const NakedSingleReport = (props) => {
  return (
    <div>
      <ReportNode className="primary">
        <MiniCell className="mini-cell" />
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
        <MiniCell className="mini-cell" />
        <div className="lead">
          <Pop className="ter">So, other cells...</Pop>
        </div>
        <div className="text">
          in the same <Hlt className="ter">house</Hlt>,{" "}
          <Hlt className="ter">row</Hlt>, or <Hlt className="ter">column</Hlt>{" "}
          can no longer be <Pop className="ter">{props.x}</Pop>.
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
  //TODO: test if this works as is, otherwise reconstruct how BirdTweet accepts input
  report: (soln) => {
    return NakedSingleReport(soln);
  },
  getDesc: (soln) => {
    return {
      primary: {
        subject: "This cell...",
        text: "must be x0, because its only remaining suspect is x0.",
      },
      tertiary: {
        subject: "So, other cells...",
        text:
          "in the same house, row, or column can no longer be " + soln + ".",
      },
    };
  },
  // desc: {
  //   primary: {
  //     subject: "This cell...",
  //     text: "must be X, because its only remaining suspect is X.",
  //   },
  //   tertiary: {
  //     subject: "So, other cells...",
  //     text: "in the same house, row, or column can eliminate X as a suspect.",
  //   },
  // },
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
      snapshot.desc = nakedSingle.getDesc(suspects[0] + 1);
      snapshot.props = {
        x: suspects[0] + 1,
      };
      return snapshot;
    }
    return false;
  },
};
