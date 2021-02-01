import React from "react";
import styled from "styled-components";
import { colors, animation } from "./../../params.js";

export const Note = (props) => {
  return (
    <StyledDiv className={props.tag === 3 ? "style3" : ""}>
      {props.tag === -1 && <Overlay>X</Overlay>}
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

  color: transparent;
  font-weight: normal;
  font-size: 125%;

  animation: flashX ${animation.speed} ease-in-out;
  @keyframes flashX {
    ${animation.midPoint} {
      color: ${colors.noteAccent};
      font-weight: ${animation.fontEmphasis};
    }
  }
  animation: flashN ${animation.speed} ease-in-out;
  @keyframes flashN {
    ${animation.midPoint} {
      color: ${colors.noteAccent};
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
  color: ${colors.noteNormal};
  font-size: 55%;
  overflow: hidden;

  .style-2 {
    color: transparent;
    animation: fadeOut-2 ${animation.speed} ease-in;

    @keyframes fadeOut-2 {
      0% {
        color: ${colors.noteNormal};
      }
      ${animation.midPoint} {
        color: ${colors.noteNormal};
      }
    }
  }

  .style-1 {
    color: transparent;
    animation: fadeOut-1 ${animation.speed} ease-in;

    @keyframes fadeOut-1 {
      0% {
        color: ${colors.noteNormal};
      }
      ${animation.midPoint} {
        color: ${colors.noteNormal};
        font-weight: ${animation.fontEmphasis};
      }
    }
  }
  .style0 {
    color: transparent;
    animation: fadeOut0 ${animation.speed} ease-in;

    @keyframes fadeOut0 {
      0% {
        color: ${colors.noteNormal};
      }
      ${animation.midPoint} {
        color: ${colors.noteAccent};
        font-size: ${animation.fontGrow};
      }
    }
  }
  .style1 {
    font-weight: normal;
  }
  .style2 {
    color: ${colors.noteAccent};
    font-weight: bold;

    animation: fadeIn2 ${animation.speed} ease-in-out;

    @keyframes fadeIn2 {
      0% {
        color: ${colors.noteNormal};
      }
      ${animation.midPoint} {
        color: ${colors.noteAccent};
        font-size: ${animation.fontGrow};
      }
    }
  }
  .style3 {
    color: ${colors.noteNormal};
    animation: pulse3 ${animation.speed} ease-in-out;

    @keyframes pulse3 {
      ${animation.midPoint} {
        color: ${colors.sudokuSet};
        font-size: ${animation.fontGrow};
      }
    }
  }
  &.style3 {
    animation: pulse3overlay ${animation.speed} ease-in-out;

    @keyframes pulse3overlay {
      ${animation.midPoint} {
        background-color: ${colors.sudokuFG};
      }
    }
  }
`;
