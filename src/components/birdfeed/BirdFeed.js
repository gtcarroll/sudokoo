import React from "react";
import styled from "styled-components";
import { BirdTweet } from "./";
import { colors, animation } from "../../params.js";
import bird from "../../assets/bird1.png";

export const BirdFeed = (props) => {
  // console.log(props.currTweet);
  return (
    <StyledDiv className={props.nextTweet ? "next" : ""}>
      {props.currTweet && (
        <BirdTweet className="curr" tweet={props.currTweet} />
      )}
      {props.nextTweet && (
        <BirdTweet className="next" tweet={props.nextTweet} />
      )}
      <img
        src={bird}
        alt="bird"
        onClick={() => {
          console.log("open bird menu");
        }}
      />
    </StyledDiv>
  );
};

BirdFeed.defaultProps = {
  prevTweet: false,
  currTweet: false,
  nextTweet: false,
};

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;

  img {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: ${colors.neutralLowest};

    max-width: 80%;
    max-height: 300px;
    transition: all ${animation.buttonSpeed} ease;

    border: 2px solid ${colors.neutralHigh};
    border-radius: 50%;
    &:hover {
      border-color: ${colors.accentSecondary};
      transform: scale(1.025);
        2;
    }
    &:active {
      transform: scale(0.97, 0.93);
    }
  }

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
