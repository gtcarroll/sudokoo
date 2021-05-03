import React, { useState } from "react";
import styled from "styled-components";
import { BirdTweet } from "./";
import { colors, animation } from "../../params.js";
import bird from "../../assets/bird_idle.png";
import birdEureka from "../../assets/bird_eureka.png";
import birdSquish from "../../assets/bird_squish.png";

export const BirdFeed = (props) => {
  const [animate, setAnimate] = useState(true);
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
        key={props.key}
        onAnimationEnd={() => setAnimate(false)}
        className={
          (animate ? "animate " : "") +
          (props.isNewTweet ? "chirp " : "") +
          (props.next ? "primary " : "") +
          (props.auto ? "secondary " : "") +
          (props.prev ? "tertiary " : "") +
          (props.isSolved ? "eureka " : "")
        }
        onClick={() => {
          console.log("open bird menu");
        }}
      />
    </StyledDiv>
  );
};

BirdFeed.defaultProps = {
  currTweet: false,
  nextTweet: false,
  auto: false,
  key: 0,
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

  img {
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: ${colors.neutralLowest};

    max-width: 80%;
    max-height: 250px;
    transition: all ${animation.buttonSpeed} ease-out;

    border: 2px solid ${colors.neutralHigh};
    border-radius: 50%;

    content: url(${bird});

    &.animate {
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
    &.eureka {
      content: url(${birdEureka});
      box-shadow: 0 0 0 0.2rem ${colors.accentPrimary50},
        0 0 0 0.4rem ${colors.accentSecondary50},
        0 0 0 0.6rem ${colors.accentTertiary50};
    }
    &:hover {
      border-color: ${colors.accentSecondary};
      transform: scale(1.025);
    }
    &:active {
      transform: scale(0.98, 0.96);
      box-shadow: 0 0 0 0 ${colors.neutralLowest},
        0 0 0.5rem 0.5rem ${colors.accentSecondary50};
      content: url(${birdSquish});
      &.eureka {
        box-shadow: 0 0 0 0.3rem ${colors.accentPrimary50},
          0 0 0 0.6rem ${colors.accentSecondary50},
          0 0 0 0.9rem ${colors.accentTertiary50};
      }
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

  @keyframes ripplePriChirp {
    20% {
      box-shadow: 0 0 0 0 ${colors.neutralLowest},
        0 0 0 0.5rem ${colors.accentPrimary50};
      transform: scale(0.98, 0.96);
      content: url(${birdSquish});
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutralLowest},
        0 0 0 1rem ${colors.accentPrimary50};
      content: url(${birdEureka});
    }
    100% {
      box-shadow: 0 0 0 2rem ${colors.neutralLowest},
        0 0 0 2rem ${colors.accentPrimary50};
      content: url(${birdEureka});
    }
  }
  @keyframes ripplePri {
    20% {
      box-shadow: 0 0 0 0.5rem ${colors.neutralLowest},
        0 0 0 0 ${colors.accentPrimary50};
      transform: scale(0.98, 0.96);
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutralLowest},
        0 0 0 1rem ${colors.accentPrimary50};
    }
    100% {
      box-shadow: 0 0 0 2rem ${colors.neutralLowest},
        0 0 0 2rem ${colors.accentPrimary50};
      content: url(${bird});
    }
  }
  @keyframes rippleSec {
    20% {
      box-shadow: 0 0 0 0.5rem ${colors.neutralLowest},
        0 0 0 0 ${colors.accentSecondary50};
      transform: scale(0.98, 0.96);
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutralLowest},
        0 0 0 1rem ${colors.accentSecondary50};
    }
    100% {
      box-shadow: 0 0 0 2rem ${colors.neutralLowest},
        0 0 0 2rem ${colors.accentSecondary50};
      content: url(${bird});
    }
  }
  @keyframes rippleSecChirp {
    20% {
      box-shadow: 0 0 0 0.5rem ${colors.neutralLowest},
        0 0 0 0 ${colors.accentSecondary50};
      transform: scale(0.98, 0.96);
      content: url(${birdSquish});
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutralLowest},
        0 0 0 1rem ${colors.accentSecondary50};
      content: url(${birdEureka});
    }
    100% {
      box-shadow: 0 0 0 2rem ${colors.neutralLowest},
        0 0 0 2rem ${colors.accentSecondary50};
      content: url(${birdEureka});
    }
  }
  @keyframes rippleTer {
    20% {
      box-shadow: 0 0 0 0.5rem ${colors.neutralLowest},
        0 0 0 0 ${colors.accentTertiary50};
      transform: scale(0.98, 0.96);
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutralLowest},
        0 0 0 1rem ${colors.accentTertiary50};
    }
    100% {
      box-shadow: 0 0 0 2rem ${colors.neutralLowest},
        0 0 0 2rem ${colors.accentTertiary50};
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
