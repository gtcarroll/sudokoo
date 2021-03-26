import React from "react";
import styled from "styled-components";
import { colors, animation } from "./../../params.js";

//TODO: clean this up!
export const Note = (props) => {
  return (
    <StyledDiv className={"style" + props.tag}>
      {props.tag < 0 && <Overlay>X</Overlay>}
      <span className={"style" + props.tag}>{props.num}</span>
    </StyledDiv>
  );
};

Note.defaultProps = {
  num: 0,
  tag: 0,
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

  color: transparent;
  font-weight: normal;
  font-size: 125%;

  animation: crossOutOverlay ${animation.speed} ease-in-out;
  @keyframes crossOutOverlay {
    ${animation.midPoint} {
      color: ${colors.accentRemoval};
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
  font-size: 55%;
  overflow: hidden;

  .style-1,
  .style-2 {
    color: transparent;

    animation: crossOutNum ${animation.speed} ease-in;
    @keyframes crossOutNum {
      0% {
        color: ${colors.neutralHighest};
      }
      ${animation.midPoint} {
        color: ${colors.neutralHighest};
      }
    }
  }

  .style0 {
    color: transparent;

    animation: fadeOut ${animation.speed} ease-in;
    @keyframes fadeOut {
      0% {
        color: ${colors.neutralHighest};
      }
      ${animation.midPoint} {
        color: ${colors.neutralHighest};
      }
    }
  }

  .style1 {
    font-weight: normal;
  }

  .style2,
  .style3 {
    color: ${colors.neutralHighest};

    animation: pulseNum ${animation.speed} ease-in-out;
    @keyframes pulseNum {
      0% {
        color: ${colors.neutralHighest};
      }
      ${animation.midPoint} {
        color: ${colors.neutralMid};
        font-size: ${animation.fontGrow};
      }
    }
  }

  &.style2,
  &.style3 {
    animation: pulseUnderlay ${animation.speed} ease-in-out;
    @keyframes pulseUnderlay {
      ${animation.midPoint} {
        background-color: ${colors.accentHighlight};
      }
    }
  }
`;
