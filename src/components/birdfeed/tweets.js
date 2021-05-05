import React from "react";
import { ReportNode, MiniCell, Pop, Hlt } from "../birdfeed";

export const tweetUnloaded = () => {
  return (
    <div>
      <ReportNode style={{ paddingBottom: 0 }} className="secondary">
        <MiniCell className="mini-cell hollow" />
        <div className="lead">
          <Pop className="sec">Enter a sudoku</Pop>
        </div>
      </ReportNode>
      <ReportNode className="connector">
        <div className="lead">
          <Pop>or</Pop>
        </div>
      </ReportNode>
      <ReportNode
        style={{ marginTop: 0, paddingBottom: 0 }}
        className="primary"
      >
        <MiniCell className="mini-cell hollow" />
        <div className="lead">
          <Pop className="pri">get a random one!</Pop>
        </div>
      </ReportNode>
      <ReportNode>
        <div className="lead">Then, I'll break down how I would solve it!</div>
      </ReportNode>
    </div>
  );
};
