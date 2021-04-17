import React from "react";
import styled from "styled-components";
import { colors, animation } from "./../../params.js";

//TODO: clean this up!
export const Note = (props) => {
  let accent =
    props.accent && props.accent.has(props.num - 1)
      ? props.accent.get(props.num - 1)
      : "";
  return (
    <StyledDiv className={accent}>
      {accent === "tertiary" && <Overlay className={accent}>X</Overlay>}
      <span className={accent + (props.toggle ? " on" : " off")}>
        {props.num}
      </span>
    </StyledDiv>
  );
};

Note.defaultProps = {
  num: 0,
  toggle: false,
  accent: false,
  // accent: {
  //   primary: false,
  //   secondary: false,
  //   tertiary: false,
  // },
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
  top: -10%;

  color: transparent;
  font-weight: 1000;
  font-size: 150%;

  animation: crossOutOverlay ${animation.speed} ease-in-out;
  @keyframes crossOutOverlay {
    ${animation.midPoint} {
      color: ${colors.accentTertiary};
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
  color: ${colors.neutralHighest};
  font-weight: normal;
  font-size: 55%;
  overflow: hidden;

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
      color: ${colors.neutralHighest};
    }

    animation: crossOutNum ${animation.speed} ease-in;
    @keyframes crossOutNum {
      0% {
        color: ${colors.neutralHighest};
      }
      ${animation.midPoint} {
        color: transparent;
      }
    }
  }

  /* .style0 {
    color: transparent;

    animation: fadeOut ${animation.speed} ease-in;
    @keyframes fadeOut {
      0% {
        color: ${colors.neutralHighest};
      }
      ${animation.midPoint} {
        color: transparent;
      }
    }
  } */

  .primary,
  .secondary {
    color: ${colors.neutralHighest};

    animation: pulseNum ${animation.speed} ease-in-out;
    @keyframes pulseNum {
      ${animation.midPoint} {
        color: ${colors.neutralMid};
        font-size: ${animation.fontGrow};
      }
    }
  }

  &.primary {
    animation: pulseUnderlay ${animation.speed} ease-in-out;
    @keyframes pulseUnderlay {
      ${animation.midPoint} {
        background-color: ${colors.accentPrimary};
      }
    }
  }
  &.secondary {
    animation: pulseUnderlayS ${animation.speed} ease-in-out;
    @keyframes pulseUnderlayS {
      ${animation.midPoint} {
        background-color: ${colors.accentSecondary};
      }
    }
  }
`;
