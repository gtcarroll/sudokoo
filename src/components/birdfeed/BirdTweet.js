import React from "react";
import styled from "styled-components";
import { colors } from "../../params.js";

export const axesNames = ["row", "column", "house"];

export const BirdTweet = (props) => {
  return (
    <StyledDiv className={props.className} key={props.tweet.key} active={true}>
      <ReportHeader>
        <div>
          {props.tweet.technique ? props.tweet.technique.name : "Hello There!"}
        </div>
        <div className={"tweet-key"}>#{props.tweet.key}</div>
      </ReportHeader>
      {props.tweet.report ? (
        props.tweet.report
      ) : (
        <div>
          <ReportNode style={{ paddingBottom: 0 }} className="primary">
            <MiniCell className="mini-cell" />
            <div className="lead">
              <Pop className="pri">Enter a sudoku</Pop>
            </div>
          </ReportNode>
          <ReportNode className="connector">
            <div className="lead">
              <Pop>or</Pop>
            </div>
          </ReportNode>
          <ReportNode
            style={{ marginTop: 0, paddingBottom: 0 }}
            className="tertiary"
          >
            <MiniCell className="mini-cell" />
            <div className="lead">
              <Pop className="ter">get a random one!</Pop>
            </div>
          </ReportNode>
          <ReportNode>
            <div className="lead">
              Then, I'll break down how I would solve it!
            </div>
          </ReportNode>
        </div>
      )}
    </StyledDiv>
  );
};

BirdTweet.defaultProps = {
  tweet: {
    key: 0,
    snapshot: false,
    technique: false,
    report: false,
  },
};

const StyledDiv = styled.div`
  max-width: 28rem;
`;

const ReportHeader = styled.div`
  width: 28rem;
  color: ${colors.neutralHighest};
  background-color: ${colors.neutralLow};
  transition: inherit;

  font-size: 1.5rem;
  padding: 0.4rem 0.4rem 0.6rem 0.6rem;

  border: 2px solid ${colors.neutralHigh};

  display: grid;
  grid-template-columns: 1fr 2rem;

  .tweet-key {
    color: ${colors.neutralHighest50};
    font-size: 1rem;
    margin-top: 0.3rem;
  }
`;
export const ReportNode = styled.div`
  display: grid;
  grid-template-rows: 3rem 1fr;
  grid-template-columns: 3rem 1fr;
  grid-template-areas:
    "cell lead"
    "text text";
  width: 100%;
  margin: 1rem 0.8rem 0 0;
  padding-bottom: 0.5rem;

  color: ${colors.text};

  &.connector {
    margin: 0;
    padding: 0;
  }

  .text {
    grid-area: text;
    font-size: 1.4rem;
    padding: 0em 0.6em 0.4em 0.6em;
    margin: 0rem 1.5rem;
  }

  .lead {
    grid-area: lead;
    font-size: 1.5rem;
    padding: 0.8rem 0rem 0rem 0.3rem;
    white-space: nowrap;
  }

  .text,
  .lead {
    font-size: 1.4rem;
  }
  &.primary {
    .mini-cell {
      background-color: ${colors.accentPrimaryBG};
      border: 2px solid ${colors.accentPrimary50};
    }
  }
  &.secondary {
    .mini-cell {
      background-color: ${colors.accentSecondaryBG};
      border: 2px solid ${colors.accentSecondary50};
    }
  }
  &.tertiary {
    .mini-cell {
      background-color: ${colors.accentTertiaryBG};
      border: 2px solid ${colors.accentTertiary50};
    }
  }
`;
export const Pop = styled.span`
  padding: 0rem 0.1rem;
  &.pri {
    color: ${colors.accentPrimary};
  }
  &.sec {
    color: ${colors.accentSecondary};
  }
  &.ter {
    color: ${colors.accentTertiary};
  }
`;
export const Hlt = styled.span`
  padding: 0rem 0.3rem;
  border-radius: 2px;
  &.pri {
    background-color: ${colors.accentPrimaryPressed};
  }
  &.sec {
    background-color: ${colors.accentSecondaryPressed};
  }
  &.ter {
    background-color: ${colors.accentTertiaryPressed};
  }
`;
export const MiniCell = styled.div`
  grid-area: cell;

  margin: 0.9rem;
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 2px;
`;
