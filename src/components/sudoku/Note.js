import React from "react";
import styled from "styled-components";
import { colors, animation } from "./../../params.js";

export const Note = (props) => {
  let accent =
    props.accent && props.accent.has(props.num - 1)
      ? props.accent.get(props.num - 1)
      : "";
  return (
    <StyledDiv className={(props.auto ? "" : "repeat ") + accent}>
      <Overlay className={(props.auto ? "" : "repeat ") + "overlayX " + accent}>
        X
      </Overlay>
      <span
        className={
          (props.auto ? "" : "repeat ") +
          (props.toggle ? "on " : "off ") +
          accent
        }
      >
        {props.num}
      </span>
    </StyledDiv>
  );
};

Note.defaultProps = {
  num: 0,
  toggle: false,
  accent: false,
  auto: false,
};

const Overlay = styled.div`
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;

  opacity: 0;
  color: ${colors.tertiary};
  font-weight: 1000;

  &.tertiary {
    opacity: 1;
    font-weight: ${animation.fontEmphasis};
    &.repeat {
      opacity: 0;
      font-weight: normal;
      animation: crossOutOverlay ${animation.speed} ease-in-out;
      animation-iteration-count: infinite;
    }
  }
  @keyframes crossOutOverlay {
    ${animation.midPoint} {
      opacity: 1;
      font-weight: ${animation.fontEmphasis};
    }
  }
`;

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
  color: ${colors.neutral4};
  background-color: transparent;
  font-weight: normal;
  font-size: 55%;
  overflow: hidden;
  transition: ${animation.halfSpeed} ease-in-out;
  * {
    transition: ${animation.halfSpeed} ease-in-out;
  }

  &.primary,
  &.secondary,
  &.tertiary,
  .primary,
  .secondary,
  .tertiary {
    animation-iteration-count: infinite !important;
  }

  .off {
    color: transparent;
    &.tertiary {
      color: ${colors.neutral4};
    }
  }

  .primary,
  .secondary {
    color: ${colors.neutral2};
    font-size: ${animation.fontGrow};

    &.repeat {
      color: ${colors.neutral4};
      font-size: 100%;
      animation: pulseNum ${animation.speed} ease-in-out;
      animation-iteration-count: infinite;
    }

    @keyframes pulseNum {
      ${animation.midPoint} {
        color: ${colors.neutral2};
        font-size: ${animation.fontGrow};
      }
    }
  }

  &.primary {
    background-color: ${colors.primary};
    &.repeat {
      background-color: transparent;
      animation: pulseUnderlay ${animation.speed} ease-in-out;
      animation-iteration-count: infinite;
    }
    @keyframes pulseUnderlay {
      ${animation.midPoint} {
        background-color: ${colors.primary};
      }
    }
  }
  &.secondary {
    background-color: ${colors.secondary};
    &.repeat {
      background-color: transparent;
      animation: pulseUnderlayS ${animation.speed} ease-in-out;
      animation-iteration-count: infinite;
    }
    @keyframes pulseUnderlayS {
      ${animation.midPoint} {
        background-color: ${colors.secondary};
      }
    }
  }
`;
