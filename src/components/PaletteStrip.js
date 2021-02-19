import React from "react";
import styled from "styled-components";
import { colors } from "./../params.js";

export const PaletteStrip = (props) => {
  return (
    <StyledDiv>
      <div className={"neutralLowest"}></div>
      <div className={"neutralLow"}></div>
      <div className={"neutralMid"}></div>
      <div className={"neutralHigh"}></div>
      <div className={"neutralHighest"}></div>
      <div className={"accentHighlight"}></div>
      <div className={"accentHighlightAlt"}></div>
      <div className={"accentRemoval"}></div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  width: 100%;
  height: 20px;

  display: flex;

  div {
    flex-grow: 1;
  }

  .neutralLowest {
    background-color: ${colors.neutralLowest};
  }

  .neutralLow {
    background-color: ${colors.neutralLow};
  }

  .neutralMid {
    background-color: ${colors.neutralMid};
  }

  .neutralHigh {
    background-color: ${colors.neutralHigh};
  }

  .neutralHighest {
    background-color: ${colors.neutralHighest};
  }

  .accentHighlight {
    background-color: ${colors.accentHighlight};
  }

  .accentHighlightAlt {
    background-color: ${colors.accentHighlightAlt};
  }

  .accentRemoval {
    background-color: ${colors.accentRemoval};
  }
`;
