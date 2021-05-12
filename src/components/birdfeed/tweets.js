import React from "react";
import { ReportNode, MiniCell, Pop, Hlt } from "../birdfeed";

export const tweetUnloaded = {
  snapshot: false,
  technique: { name: "Hello there!" },
  key: false,
  getReport: () => {
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
  getReport: () => {
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

const TechNode = (props) => {
  console.log(props);
  let isSingle =
    props.name === "Naked Single" || props.name === "Hidden Single";
  return (
    <ReportNode style={{ marginTop: 0, paddingBottom: 0 }} className="primary">
      <div className="lead">
        <Hlt className={isSingle ? "pri" : "sec"}>{props.name}</Hlt>{" "}
        <span style={{ float: "right" }}>
          <span style={{ fontSize: "1rem" }}>x</span>
          <Pop className={isSingle ? "pri" : "sec"}>{props.count}</Pop>
        </span>
      </div>
    </ReportNode>
  );
};

TechNode.defaultProps = {
  name: "Technique",
  count: 1,
};

const SolvedReport = (props) => {
  console.log([...props]);
  return (
    <div>
      <ReportNode style={{ paddingBottom: 0 }} className="secondary">
        <MiniCell className="mini-cell solved" />
        <div className="lead">
          <Pop className="sec">This sudoku is solved!</Pop>
        </div>
        <div className="text">We did it using the following techniques...</div>
      </ReportNode>
      {[...props].map(
        (kv) => kv[1] > 0 && <TechNode name={kv[0]} count={kv[1]} />
      )}
    </div>
  );
};

export const tweetSolved = {
  solved: true,
  snapshot: false,
  technique: { name: "Hurray!" },
  key: "S",
  getReport: (props) => {
    return SolvedReport(props);
  },
};
