import React from "react";
import styled from "styled-components";
import { colors, animation } from "./../../params.js";

export const Note = (props) => {
  return (
    <StyledDiv>
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
  font-size: 120%;
  font-weight: 800;

  animation: flash ${animation.speed} ease-in-out;
  @keyframes flash {
    ${animation.midPt} {
      color: ${colors.sudokuFG};
    }
  }
`;

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
  color: ${colors.noteNormal};
  font-size: 55%;
  overflow: hidden;

  .style-1,
  .style0 {
    color: transparent;
    animation: fadeOut ${animation.speed} ease-out;

    @keyframes fadeOut {
      0% {
        color: ${colors.noteNormal};
      }
      ${animation.midPt} {
        color: transparent;
      }
    }
  }
  .style1 {
    font-weight: normal;
  }
  .style2 {
    color: ${colors.noteAccent};
    font-weight: bold;
  }
`;
