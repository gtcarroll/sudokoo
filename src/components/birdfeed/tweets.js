import React from "react";
import { ReportNode, MiniCell, Pop, Hlt } from "../birdfeed";

export const tweetUnloaded = {
  snapshot: false,
  technique: { name: "Hello there!" },
  key: false,
  report: () => {
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
        <ReportNode style={{ marginTop: 0 }} className="primary">
          <MiniCell className="mini-cell hollow" />
          <div className="lead">
            <Pop className="pri">get a random one!</Pop>
          </div>
          <div className="text" style={{ padding: "1.6rem 0 0 0" }}>
            Then, I'll break down how I would solve it!
          </div>
        </ReportNode>
      </div>
    );
  },
};

export const tweetLoaded = {
  snapshot: false,
  technique: { name: "Let's solve it!" },
  key: 0,
  report: () => {
    return (
      <div>
        <ReportNode style={{ paddingBottom: 0 }} className="primary">
          <MiniCell className="mini-cell hollow" />
          <div className="lead">
            <Pop className="pri">{"Press 'next >'..."}</Pop>
          </div>
          <div className="text">
            to see the <Hlt className="pri">next solution</Hlt> I find.
          </div>
        </ReportNode>
        <ReportNode style={{ paddingBottom: 0 }} className="secondary">
          <MiniCell className="mini-cell hollow" />
          <div className="lead">
            <Pop className="sec">{"Press 'play'..."}</Pop>
          </div>
          <div className="text">
            to see <Hlt className="sec">all of the solutions</Hlt> I find, until
            you <Pop className="sec">press 'pause'.</Pop>
          </div>
        </ReportNode>
        <ReportNode style={{ paddingBottom: 0 }} className="tertiary">
          <MiniCell className="mini-cell hollow" />
          <div className="lead">
            <Pop className="ter">{"Press '< prev'..."}</Pop>
          </div>
          <div className="text">
            to see my <Hlt className="ter">previous solution</Hlt> again.
          </div>
        </ReportNode>
      </div>
    );
  },
};
