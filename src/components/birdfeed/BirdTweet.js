import React, { useState } from "react";
import styled from "styled-components";
import { colors, animation } from "../../params.js";

export const BirdTweet = (props) => {
  return (
    <StyledLi
      key={props.tweet.key}
      // onClick={() => mountSnapshot(tweet.snapshot)}
      // onMouseEnter={() => mountSnapshot(tweet.snapshot)}
      // onMouseLeave={() => dismountSnapshot()}
      // onFocus={() => mountSnapshot(props.tweet.snapshot)}
      // onBlur={() => dismountSnapshot()}
      tabIndex={0}
      active={true}
    >
      <div className={"tweet-label"}>
        <div>{props.tweet.technique.name}</div>
        <div className={"tweet-key"}>#{props.tweet.key}</div>
      </div>
      {props.tweet.technique.desc && props.tweet.technique.desc["primary"] && (
        <TweetNode>
          <MiniCell className="primary" />
          <div className={"tweet-name primary"}>
            {props.tweet.technique.desc["primary"].subject}
          </div>
          <div className={"tweet-text"}>
            {props.tweet.technique.desc["primary"].text}
          </div>
        </TweetNode>
      )}
      {props.tweet.technique.desc && props.tweet.technique.desc["secondary"] && (
        <TweetNode>
          <MiniCell className="secondary" />
          <div className={"tweet-name secondary"}>
            {props.tweet.technique.desc["secondary"].subject}
          </div>
          <div className={"tweet-text"}>
            {props.tweet.technique.desc["secondary"].text}
          </div>
        </TweetNode>
      )}
      {props.tweet.technique.desc && props.tweet.technique.desc["tertiary"] && (
        <TweetNode>
          <MiniCell className="tertiary" />
          <div className={"tweet-name tertiary"}>
            {props.tweet.technique.desc["tertiary"].subject}
          </div>
          <div className={"tweet-text"}>
            {props.tweet.technique.desc["tertiary"].text}
          </div>
        </TweetNode>
      )}
    </StyledLi>
  );
};

BirdTweet.defaultProps = {
  tweet: {
    key: -1,
    snapshot: false,
    technique: false,
  },
};

const StyledLi = styled.li`
  transition: all ${animation.halfSpeed} ease;
  overflow: hidden;
  box-sizing: border-box;

  height: 3.1rem;
  max-width: 60vh;
  &:active,
  &:focus,
  &.active {
    color: ${colors.accentPrimary};
    height: 100%;
  }

  .tweet-name {
    grid-area: name;
    font-size: 1.4rem;
    padding: 0.8rem 0rem 0rem 0.4rem;

    &.primary {
      color: ${colors.accentPrimary};
    }
    &.secondary {
      color: ${colors.accentSecondary};
    }
    &.tertiary {
      color: ${colors.accentTertiary};
    }
  }

  .tweet-label {
    color: ${colors.neutralHighest};
    background-color: ${colors.neutralLow};
    transition: inherit;

    font-size: 1.5rem;
    padding: 0.4rem 0.4rem 0.6rem 0.6rem;

    border: 2px solid ${colors.neutralHigh};
    /* * {
      &:hover,
      &:focus,
      &:active,
      &.active {
        color: ${colors.accentPrimary};
        border-color: ${colors.accentPrimary};
        background-color: ${colors.accentPrimaryBG};
      }
    } */

    // TODO: position w flexbox instead
    display: grid;
    grid-template-columns: 1fr 2rem;
    .tweet-key {
      color: ${colors.neutralHighest50};
      font-size: 1rem;
    }
  }

  .tweet-text {
    grid-area: desc;
    font-size: 0.8em;
    padding: 0.2em 0.6em 0.4em 0.6em;
    margin: 0rem 1.5rem;

    border-radius: 2px;
    border: 2px solid;

    color: ${colors.neutralHighest};
    background-color: ${colors.neutralLow};
    border: none;
  }
`;

const TweetNode = styled.div`
  display: grid;
  grid-template-rows: 3rem 1fr;
  grid-template-columns: 3rem 1fr;
  grid-template-areas:
    "cell name"
    "desc desc";
  width: 100%;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
`;

const MiniCell = styled.div`
  grid-area: cell;

  margin: 0.9rem;
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 2px;
  &.primary {
    background-color: ${colors.accentPrimaryBG};
    border: 2px solid ${colors.accentPrimary50};
  }
  &.secondary {
    background-color: ${colors.accentSecondaryBG};
    border: 2px solid ${colors.accentSecondary50};
  }
  &.tertiary {
    background-color: ${colors.accentTertiaryBG};
    border: 2px solid ${colors.accentTertiary50};
  }
`;
