import React from "react";
import styled from "styled-components";
import { colors } from "./../params.js";

export const PaletteStrip = (props) => {
  return (
    <RowContainer
      style={{ flexDirection: props.reverse ? "row-reverse" : "row" }}
    >
      <div style={{ backgroundColor: colors.neutralLowest }}></div>
      <div style={{ backgroundColor: colors.neutralLow }}></div>
      <div style={{ backgroundColor: colors.neutralMid }}></div>
      <div style={{ backgroundColor: colors.neutralHigh }}></div>
      <div style={{ backgroundColor: colors.neutralHighest }}></div>
      <div style={{ backgroundColor: colors.accentHighlight }}></div>
      <div style={{ backgroundColor: colors.accentHighlightAlt }}></div>
      <div style={{ backgroundColor: colors.accentRemoval }}></div>
    </RowContainer>
  );
};

PaletteStrip.defaultProps = {
  reverse: false,
};

const RowContainer = styled.div`
  width: 100%;
  height: 5px;
  display: flex;

  div {
    flex-grow: 1;
  }
`;
