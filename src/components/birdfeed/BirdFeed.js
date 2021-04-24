import React from "react";
import styled from "styled-components";
import { BirdTweet } from "./";
import { colors, animation } from "../../params.js";

export const BirdFeed = (props) => {
  console.log(props.currTweet);
  return (
    <StyledUl className={props.nextTweet ? "next" : ""}>
      {props.currTweet && (
        <BirdTweet className="curr" tweet={props.currTweet} />
      )}
      {props.nextTweet && (
        <BirdTweet className="next" tweet={props.nextTweet} />
      )}
    </StyledUl>
  );
};

BirdFeed.defaultProps = {
  prevTweet: false,
  currTweet: false,
  nextTweet: false,
};

const StyledUl = styled.ul`
  width: 100%;
  height: 80vh;
  margin: 0;
  padding: 0;
  position: relative;

  &.next {
    .curr {
      animation: fadeOut ${animation.speed} linear;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 100%;
    }
  }
  &.next {
    .next {
      animation: fadeIn ${animation.speed} linear;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    ${animation.midPoint} {
      opacity: 0;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    ${animation.midPoint} {
      opacity: 1;
    }
  }
`;
