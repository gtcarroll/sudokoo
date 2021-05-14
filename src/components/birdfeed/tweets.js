import React from "react";
import { ReportNode, MiniCell, Pop, Hlt, axesNames } from "../birdfeed";

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

export const tweetSolved = {
  solved: true,
  snapshot: false,
  technique: { name: "Hurray!" },
  key: 1,
  getReport: (props) => {
    return (
      <div>
        <ReportNode style={{ paddingBottom: 0 }} className="secondary">
          <MiniCell className="mini-cell solved" />
          <div className="lead">
            <Pop className="sec">This sudoku is solved!</Pop>
          </div>
          <div className="text">
            We did it using the following techniques...
          </div>
        </ReportNode>
        {[...props].map(
          (kv) =>
            kv[1] > 0 && <TechNode key={kv[0]} name={kv[0]} count={kv[1]} />
        )}
      </div>
    );
  },
};

export const tweetNoSolution = {
  failed: true,
  snapshot: false,
  technique: { name: "I can't solve this..." },
  key: 1,
  getReport: () => {
    return (
      <div>
        <ReportNode style={{ paddingBottom: 0 }} className="tertiary">
          <MiniCell className="mini-cell solid">&#9888;</MiniCell>
          <div className="lead">
            <Pop className="ter">{"I'm sorry..."}</Pop>
          </div>
          <div className="text">
            I couldn't find a solution with the techniques I know.
          </div>
        </ReportNode>
        <ReportNode style={{ paddingBottom: 0 }} className="secondary">
          <MiniCell className="mini-cell hollow" />
          <div className="lead">
            <Pop className="sec">{"Press 'reset'..."}</Pop>
          </div>
          <div className="text">
            to <Hlt className="sec">load a new sudoku</Hlt> and I'll try my best
            to solve that one!
          </div>
        </ReportNode>
      </div>
    );
  },
};

export const tweetInvalidSudoku = {
  failed: true,
  snapshot: false,
  technique: { name: "I can't solve this..." },
  key: 1,
  getReport: (props) => {
    return (
      <div>
        <ReportNode style={{ paddingBottom: 0 }} className="tertiary">
          <MiniCell className="mini-cell solid">&#9888;</MiniCell>
          <div className="lead">
            <Pop className="ter">{"This sudoku is invalid."}</Pop>
          </div>
          <div className="text">
            This <Hlt className="ter">{axesNames[props.a]}</Hlt> has more than
            one <Pop className="ter">{props.x}</Pop>.
          </div>
        </ReportNode>
        <ReportNode style={{ paddingBottom: 0 }} className="secondary">
          <MiniCell className="mini-cell hollow" />
          <div className="lead">
            <Pop className="sec">{"Press 'reset'..."}</Pop>
          </div>
          <div className="text">
            to <Hlt className="sec">load a new sudoku</Hlt> and I'll try my best
            to solve that one!
          </div>
        </ReportNode>
      </div>
    );
  },
};

tweetNoSolution.defaultProps = {
  x: 0,
  a: 0,
};
