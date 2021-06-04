import React from "react";
import styled from "styled-components";
import { colors } from "../../params.js";
import { tweetUnloaded } from "./";
import miniBird from "../../assets/mini_bird.png";
import { tweetLoaded } from "./tweets.js";

export const axesNames = ["row", "column", "house"];

export const BirdTweet = (props) => {
  return (
    <StyledDiv className={props.className} key={props.tweet.key} active={true}>
      <ReportHeader
        className={
          props.tweet.solved || props.tweet.justLoaded
            ? "solved "
            : props.tweet.failed
            ? "tertiary "
            : ""
        }
      >
        <div>
          {props.tweet.technique
            ? props.tweet.technique.name
            : tweetUnloaded.technique.name}
        </div>
        {props.tweet.solved || props.tweet.justLoaded ? (
          <div className={"tweet-key sec"}>&#9733;</div>
        ) : props.tweet.failed ? (
          <div className={"tweet-key ter"}>:(</div>
        ) : (
          (props.tweet.key || props.tweet.key === 0) && (
            <div className={"tweet-key"}>{"#" + props.tweet.key}</div>
          )
        )}
      </ReportHeader>
      {props.tweet.report
        ? props.tweet.report
        : props.tweet.getReport
        ? props.tweet.getReport()
        : tweetUnloaded.getReport()}
      <ScrollGap className={props.tweet.justLoaded ? "just-loaded " : ""} />
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

const ScrollGap = styled.div`
  height: calc(60% - 3rem);
  &.just-loaded {
    @media (orientation: portrait) {
      height: 3rem;
    }
  }
`;

const StyledDiv = styled.div`
  max-width: 28rem;
  min-width: 18rem;

  overflow-y: scroll;
  height: calc(100% - 4rem);

  @media (orientation: portrait) {
    height: 100%;
    max-width: 100%;
  }

  /* Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const ReportHeader = styled.div`
  color: ${colors.neutral4};
  background-color: ${colors.neutral1};
  transition: inherit;

  position: sticky;
  top: 0;
  z-index: 101;

  font-size: 1.5rem;
  padding: 0.4rem 0.4rem 0.6rem 0.6rem;

  border: 2px solid ${colors.neutral3};

  display: grid;
  grid-template-columns: 1fr auto;

  @media (orientation: portrait) {
    width: calc(100vw - 6rem - 4px);
    .tweet-key {
      padding-right: calc(5rem - 2px);
    }
  }

  .tweet-key {
    color: ${colors.neutral4};
    font-size: 1rem;
    margin-top: 0.4rem;
    padding-left: 0.5rem;
    width: 1.8rem;
    &.pri {
      color: ${colors.primary};
    }
    &.sec {
      color: ${colors.secondary};
    }
    &.ter {
      color: ${colors.tertiary};
    }
  }

  &.tertiary {
    color: ${colors.tertiary};
    border-color: ${colors.tertiary50};
    background-color: ${colors.tertiary15f};
  }

  &.solved {
    color: ${colors.secondary};
    background: conic-gradient(
      ${colors.primary15f} 0deg,
      ${colors.secondary15f} 120deg,
      ${colors.tertiary15f} 240deg,
      ${colors.primary15f} 360deg
    );
    border-image: conic-gradient(
        ${colors.primary} 0deg,
        ${colors.secondary} 120deg,
        ${colors.tertiary} 240deg,
        ${colors.primary} 360deg
      )
      2;
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
  z-index: 100;

  position: relative;
  overflow-y: scroll;

  @media (orientation: portrait) {
    max-width: max(calc(100% - 8rem), 20rem);
  }

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
    padding: 0.8rem 0.9rem 0rem 0.3rem;
  }

  .text,
  .lead {
    font-size: 1.4rem;
  }
  &.primary {
    .mini-cell {
      background-color: ${colors.primary15};
      border: 2px solid ${colors.primary50};
      color: ${colors.primary};
      &.hollow,
      &.solid {
        border-color: ${colors.primary};
      }
      &.hollow {
        background-color: transparent;
      }
      &.solid {
        background-color: ${colors.primary};
        color: ${colors.neutral0};
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
        color: ${colors.neutral0};
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
        color: ${colors.neutral0};
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
    width: calc(1.2rem + 4px) !important;
    height: calc(1.2rem + 4px) !important;
    border-width: 0px !important;
    color: ${colors.neutral0} !important;
    background: conic-gradient(
      ${colors.primary} 0deg,
      ${colors.secondary} 120deg,
      ${colors.tertiary} 240deg,
      ${colors.primary} 360deg
    );
  }

  &.mini-bird {
    margin: 0.3rem 0.6rem 0.3rem 0rem;
    height: 2.4rem;
    width: 2.4rem;
    background-image: url(${miniBird});
    background-size: 100% 100%;

    border: 2px solid ${colors.neutral3};
    border-radius: 50%;
  }
`;
