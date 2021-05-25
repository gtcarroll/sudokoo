import React, { useState } from "react";
import styled from "styled-components";
import { BirdTweet } from "./";
import { colors, animation } from "../../params.js";
import bird from "../../assets/bird_idle.png";
import birdEureka from "../../assets/bird_eureka.png";
import birdSquish from "../../assets/bird_squish.png";

export const BirdFeed = (props) => {
  const [animate, setAnimate] = useState(true);
  const [toggle, setToggle] = useState(false);
  return (
    <StyledDiv className={props.nextTweet ? "next" : ""}>
      {props.currTweet && (
        <BirdTweet className="curr" tweet={props.currTweet} />
      )}
      {props.nextTweet && (
        <BirdTweet className="next" tweet={props.nextTweet} />
      )}
      {!props.currTweet && !props.nextTweet && <BirdTweet />}

      <img
        draggable="false"
        alt="bird"
        onAnimationEnd={() => setAnimate(false)}
        className={
          (animate ? "animate " : "") +
          (props.isNewTweet ? "chirp " : "") +
          (props.next ? "primary " : "") +
          (props.auto ? "secondary " : "") +
          (props.prev ? "tertiary " : "") +
          (props.isSolved ? "eureka " : "") +
          (props.isFailed ? "oops " : "")
        }
        onClick={() => {
          console.log(toggle);
          setToggle(!toggle);
        }}
      />
      <button>a</button>
    </StyledDiv>
  );
};

BirdFeed.defaultProps = {
  currTweet: false,
  nextTweet: false,
  auto: false,
  next: false,
  prev: false,
  isNewTweet: true,
};

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  font-size: 1rem;

  @media (orientation: portrait) {
    font-size: 0.6rem;
  }

  button {
    position: absolute;
    z-index: 1;
    right: 4rem;
    bottom: 5rem;
  }

  img {
    box-shadow: 0 0 0 0em ${colors.neutral0}, 0 0 0 0em ${colors.secondary50};
    position: absolute;
    z-index: 0;
    right: 0;
    bottom: 4rem;
    background-color: ${colors.neutral0};

    max-width: 80%;
    max-height: min(250px, 30vh);
    transition: all ${animation.buttonSpeed} ease-out;

    border: 2px solid ${colors.neutral3};
    border-radius: 50%;

    content: url(${bird});

    @media (orientation: portrait) {
      top: 0rem;
      right: -2rem;
      max-height: 9rem;
      z-index: 104;
    }

    &.animate:not(.eureka):not(.oops) {
      &.primary {
        animation: ripplePri ${animation.halfSpeed} ease-out;
        &.chirp {
          animation: ripplePriChirp ${animation.halfSpeed} ease-out;
        }
      }
      &.secondary {
        animation: rippleSec ${animation.halfSpeed} ease-out;
        &.chirp {
          animation: rippleSecChirp ${animation.halfSpeed} ease-out;
        }
      }
      &.tertiary {
        animation: rippleTer ${animation.halfSpeed} ease-out;
      }
    }
    &.oops {
      content: url(${birdSquish});
    }
    &.eureka {
      animation: rippleEureka ${animation.halfSpeed} ease-out;
      content: url(${birdEureka});
      box-shadow: 0 0 0 0em ${colors.secondary50},
        0 0 0 0.2em ${colors.primary50}, 0 0 0 0.4em ${colors.tertiary50};
    }
    &:hover {
      border-color: ${colors.secondary};
      transform: scale(1.025);
    }
    &:active {
      box-shadow: 0 0 0 0em ${colors.neutral0},
        0 0 0 0.8em ${colors.secondary50};
      transform: scale(0.98, 0.96);
      content: url(${birdSquish});
      &.eureka {
        box-shadow: 0 0 0 0.3em ${colors.secondary50},
          0 0 0 0.6em ${colors.primary50}, 0 0 0 0.9em ${colors.tertiary50};
      }
    }
  }

  &.next {
    .curr {
      animation: fadeOut ${animation.halfSpeed} linear;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      width: 100%;
    }
  }
  &.next {
    .next {
      animation: fadeIn ${animation.halfSpeed} linear;
    }
  }

  @keyframes rippleEureka {
    0% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0 ${colors.secondary50},
        0 0 0 0 ${colors.primary50}, 0 0 0 0 ${colors.tertiary50};
      transform: scale(0.98, 0.96);
      content: url(${birdSquish});
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0.3em ${colors.secondary50},
        0 0 0 0.65em ${colors.primary50}, 0 0 0 1em ${colors.tertiary50};
      content: url(${birdEureka});
    }
    100% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0em ${colors.secondary50},
        0 0 0 0.2em ${colors.primary50}, 0 0 0 0.4em ${colors.tertiary50};
      content: url(${birdEureka});
    }
  }

  @keyframes ripplePriChirp {
    20% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0 ${colors.primary50};
      transform: scale(0.98, 0.96);
      content: url(${birdSquish});
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 1em ${colors.primary50};
      content: url(${birdEureka});
    }
    100% {
      box-shadow: 0 0 0 2em ${colors.neutral0}, 0 0 0 2em ${colors.primary50};
      content: url(${birdEureka});
    }
  }
  @keyframes ripplePri {
    20% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0 ${colors.primary50};
      transform: scale(0.98, 0.96);
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 1em ${colors.primary50};
    }
    100% {
      box-shadow: 0 0 0 2em ${colors.neutral0}, 0 0 0 2em ${colors.primary50};
      content: url(${bird});
    }
  }
  @keyframes rippleSec {
    20% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0 ${colors.secondary50};
      transform: scale(0.98, 0.96);
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 1em ${colors.secondary50};
    }
    100% {
      box-shadow: 0 0 0 2em ${colors.neutral0}, 0 0 0 2em ${colors.secondary50};
      content: url(${bird});
    }
  }
  @keyframes rippleSecChirp {
    20% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0 ${colors.secondary50};
      transform: scale(0.98, 0.96);
      content: url(${birdSquish});
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 1em ${colors.secondary50};
      content: url(${birdEureka});
    }
    100% {
      box-shadow: 0 0 0 2em ${colors.neutral0}, 0 0 0 2em ${colors.secondary50};
      content: url(${birdEureka});
    }
  }
  @keyframes rippleTer {
    20% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0 ${colors.tertiary50};
      transform: scale(0.98, 0.96);
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 1em ${colors.tertiary50};
    }
    100% {
      box-shadow: 0 0 0 2em ${colors.neutral0}, 0 0 0 2em ${colors.tertiary50};
      content: url(${bird});
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
