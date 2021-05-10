import React from "react";
import styled from "styled-components";
import { colors } from "../../params.js";
import { tweetUnloaded } from "./";

export const axesNames = ["row", "column", "house"];

export const BirdTweet = (props) => {
  return (
    <StyledDiv className={props.className} key={props.tweet.key} active={true}>
      <ReportHeader>
        <div>
          {props.tweet.technique ? props.tweet.technique.name : "Hello There!"}
        </div>
        {(props.tweet.key || props.tweet.key === 0) && (
          <div className={"tweet-key"}>#{props.tweet.key}</div>
        )}
      </ReportHeader>
      {props.tweet.report ? props.tweet.report : tweetUnloaded()}
    </StyledDiv>
  );
};

BirdTweet.defaultProps = {
  tweet: {
    key: false,
    snapshot: false,
    technique: false,
    report: false,
  },
};

const StyledDiv = styled.div`
  max-width: 28rem;
`;

const ReportHeader = styled.div`
  color: ${colors.neutral4};
  background-color: ${colors.neutral1};
  transition: inherit;

  font-size: 1.5rem;
  padding: 0.4rem 0.4rem 0.6rem 0.6rem;

  border: 2px solid ${colors.neutral3};

  display: grid;
  grid-template-columns: 1fr auto;

  .tweet-key {
    color: ${colors.neutral4};
    font-size: 1rem;
    margin-top: 0.4rem;
    padding-left: 0.5rem;
    width: 1.8rem;
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

  color: ${colors.neutral5};

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
  }

  .text,
  .lead {
    font-size: 1.4rem;
  }
  &.primary {
    .mini-cell {
      background-color: ${colors.primary15};
      border: 2px solid ${colors.primary50};
      color: ${colors.neutral0};
      &.hollow,
      &.solid {
        border-color: ${colors.primary};
      }
      &.hollow {
        background-color: transparent;
      }
      &.solid {
        background-color: ${colors.primary};
      }
    }
  }
  &.secondary {
    .mini-cell {
      background-color: ${colors.secondary15};
      border: 2px solid ${colors.secondary50};
      color: ${colors.secondary};
      &.hollow,
      &.solid {
        border-color: ${colors.secondary};
      }
      &.hollow {
        background-color: transparent;
      }
      &.solid {
        background-color: ${colors.secondary};
      }
    }
  }
  &.tertiary {
    .mini-cell {
      background-color: ${colors.tertiary15};
      border: 2px solid ${colors.tertiary50};
      color: ${colors.tertiary};
      &.hollow,
      &.solid {
        border-color: ${colors.tertiary};
      }
      &.hollow {
        background-color: transparent;
      }
      &.solid {
        background-color: ${colors.tertiary};
      }
    }
  }
`;
export const Pop = styled.span`
  padding: 0rem 0.1rem;
  &.pri {
    color: ${colors.primary};
  }
  &.sec {
    color: ${colors.secondary};
  }
  &.ter {
    color: ${colors.tertiary};
  }
`;
export const Hlt = styled.span`
  padding: 0rem 0.3rem;
  border-radius: 2px;
  &.pri {
    background-color: ${colors.primary25};
  }
  &.sec {
    background-color: ${colors.secondary25};
  }
  &.ter {
    background-color: ${colors.tertiary25};
  }
`;
export const MiniCell = styled.div`
  grid-area: cell;

  margin: 0.9rem;
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 2px;

  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  &.solved {
    background: conic-gradient(
      ${colors.secondary} 40deg,
      ${colors.primary} 130deg,
      ${colors.tertiary} 230deg,
      ${colors.secondary} 320deg
    );
    border-image: conic-gradient(
        ${colors.secondary} 40deg,
        ${colors.primary} 130deg,
        ${colors.tertiary} 230deg,
        ${colors.secondary} 320deg
      )
      2 !important;
  }
`;
