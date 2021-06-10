import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BirdTweet } from "./";
import { colors, animation } from "../../params.js";
import bird from "../../assets/bird_idle.png";
import birdEureka from "../../assets/bird_eureka.png";
import birdSquish from "../../assets/bird_squish.png";
import skipBack from "../../assets/skip_back.png";
import skipBackOff from "../../assets/skip_back_off.png";
import skipForward from "../../assets/skip_forward.png";
import skipForwardOff from "../../assets/skip_forward_off.png";
import resetSudoku from "../../assets/delete.png";
import resetSudokuOff from "../../assets/delete_off.png";

export const BirdFeed = (props) => {
  const [animate, setAnimate] = useState(true);
  const [subMenuToggle, setToggle] = useState(props.isSolved);
  let backToggle = !props.isFirstTweet;
  let forwardToggle = !props.isLastTweet;
  let resetToggle = props.isLoaded;

  return (
    <StyledDiv className={props.nextTweet ? "next" : ""}>
      {props.currTweet && (
        <BirdTweet className="curr" tweet={props.currTweet} />
      )}
      {props.nextTweet && (
        <BirdTweet className="next" tweet={props.nextTweet} />
      )}
      {!props.currTweet && !props.nextTweet && <BirdTweet />}

      <button
        onAnimationEnd={() => setAnimate(false)}
        className={
          "bird " +
          (animate ? "animate " : "") +
          (subMenuToggle ? "menu-active " : "") +
          (props.isNewTweet ? "chirp " : "") +
          (props.next ? "primary " : "") +
          (props.auto ? "secondary " : "") +
          (props.prev ? "tertiary " : "") +
          (props.isSolved ? "eureka " : "") +
          (props.isFailed ? "oops " : "")
        }
        onClick={() => {
          setToggle(!subMenuToggle);
        }}
      ></button>
      <button
        className={
          "submenu skip back " +
          (subMenuToggle ? "show " : "hide ") +
          (backToggle ? "" : "disabled ")
        }
        onClick={backToggle ? () => props.firstTweet() : null}
        tabIndex={subMenuToggle ? "0" : "-1"}
      ></button>
      <button
        className={
          "submenu skip forward " +
          (subMenuToggle ? "show " : "hide ") +
          (forwardToggle ? "" : "disabled ")
        }
        onClick={forwardToggle ? () => props.lastTweet() : null}
        tabIndex={subMenuToggle ? "0" : "-1"}
      ></button>
      <button
        className={
          "submenu delete " +
          (subMenuToggle ? "show " : "hide ") +
          (resetToggle ? "" : "disabled ")
        }
        onClick={resetToggle ? () => props.resetSudoku() : null}
        tabIndex={subMenuToggle ? "0" : "-1"}
      ></button>
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
  isLoaded: false,
  isSolved: false,
  isFirstTweet: true,
  isLastTweet: true,
};

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  display: flex;
  font-size: 1rem;

  .submenu {
    background-color: ${colors.neutral0};
    background-size: 100% 100%;
    position: absolute;
    right: 5rem;
    bottom: 7rem;
    height: 3.5rem;
    width: 3.5rem;
    z-index: 103;
    @media (orientation: portrait) {
      right: 1.5rem;
      bottom: calc(100% - 5rem);
    }

    border-radius: 50%;
    border: 2px solid ${colors.neutral3};

    transition: all ${animation.buttonSpeed},
      bottom ${animation.buttonSlowSpeed} ease,
      right ${animation.buttonSlowSpeed} ease;

    &:hover:not(.disabled) {
      transform: scale(1.1);
    }
    &:active:not(.disabled) {
      transform: scale(0.96, 0.94);
    }

    &.skip {
      &:hover:not(.disabled) {
        border-color: ${colors.primary};
        background-color: ${colors.primary15f};
      }
      &:active:not(.disabled) {
        background-color: ${colors.primary25f};
      }
      &.show {
        bottom: calc(min(250px, 30vh) + 4.5rem);
        @media (orientation: portrait) {
          bottom: calc(100% - 13.5rem);
        }
      }
    }
    &.back {
      background-image: url(${skipBack});
      &.show {
        right: calc(min(125px, 15vh) + 0.5rem);
        @media (orientation: portrait) {
          right: 4rem;
        }
      }
      &.disabled {
        background-image: url(${skipBackOff});
      }
    }
    &.forward {
      background-image: url(${skipForward});
      &.show {
        right: calc(min(125px, 15vh) - 4rem);
        @media (orientation: portrait) {
          right: -0.5rem;
        }
      }
      &.disabled {
        background-image: url(${skipForwardOff});
      }
    }
    &.delete {
      height: 3rem;
      width: 3rem;
      background-image: url(${resetSudoku});
      &:hover:not(.disabled) {
        border-color: ${colors.tertiary};
        background-color: ${colors.tertiary15f};
      }
      &:active:not(.disabled) {
        background-color: ${colors.tertiary25f};
      }
      &.show {
        right: calc(min(250px, 30vh) - 0.5rem);
        bottom: 5rem;
      }
      &.disabled {
        background-image: url(${resetSudokuOff});
      }

      @media (orientation: portrait) {
        &.show {
          right: -0.5rem;
          bottom: calc(100% - 18rem);
        }
      }
    }
  }

  .bird {
    box-shadow: 0 0 0 0em ${colors.neutral0}, 0 0 0 0em ${colors.secondary50};
    position: absolute;
    z-index: 104;
    right: 0;
    bottom: 4rem;
    background-color: ${colors.neutral0};

    width: min(250px, 30vh);
    height: min(250px, 30vh);
    transition: all ${animation.buttonSpeed} ease-out;

    border: 2px solid ${colors.neutral3};
    border-radius: 50%;

    background-image: url(${bird});
    background-size: 100% 100%;

    @media (orientation: portrait) {
      top: 0rem;
      right: -2rem;
      height: 9rem;
      width: 9rem;

      font-size: 0.6rem;
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
      background-image: url(${birdSquish});
    }
    &.eureka {
      animation: rippleEureka ${animation.halfSpeed} ease-out;
      background-image: url(${birdEureka});
      box-shadow: 0 0 0 0em ${colors.secondary50},
        0 0 0 0.2em ${colors.primary50}, 0 0 0 0.4em ${colors.tertiary50};
    }
    &:hover,
    &.menu-active {
      border-color: ${colors.secondary};
      transform: scale(1.025);
    }
    &:active {
      box-shadow: 0 0 0 0em ${colors.neutral0},
        0 0 0 0.8em ${colors.secondary50};
      transform: scale(0.98, 0.96);
      background-image: url(${birdSquish});
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
      background-image: url(${birdSquish});
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0.3em ${colors.secondary50},
        0 0 0 0.65em ${colors.primary50}, 0 0 0 1em ${colors.tertiary50};
      background-image: url(${birdEureka});
    }
    100% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0em ${colors.secondary50},
        0 0 0 0.2em ${colors.primary50}, 0 0 0 0.4em ${colors.tertiary50};
      background-image: url(${birdEureka});
    }
  }

  @keyframes ripplePriChirp {
    20% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0 ${colors.primary50};
      transform: scale(0.98, 0.96);
      background-image: url(${birdSquish});
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 1em ${colors.primary50};
      background-image: url(${birdEureka});
    }
    100% {
      box-shadow: 0 0 0 2em ${colors.neutral0}, 0 0 0 2em ${colors.primary50};
      background-image: url(${birdEureka});
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
      background-image: url(${bird});
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
      background-image: url(${bird});
    }
  }
  @keyframes rippleSecChirp {
    20% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 0 ${colors.secondary50};
      transform: scale(0.98, 0.96);
      background-image: url(${birdSquish});
    }
    40% {
      box-shadow: 0 0 0 0 ${colors.neutral0}, 0 0 0 1em ${colors.secondary50};
      background-image: url(${birdEureka});
    }
    100% {
      box-shadow: 0 0 0 2em ${colors.neutral0}, 0 0 0 2em ${colors.secondary50};
      background-image: url(${birdEureka});
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
      background-image: url(${bird});
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
