import React from "react";
import styled from "styled-components";
import { colors } from "./../params.js";

export const PaletteStrip = (props) => {
  return (
    <GradientContainer
      style={{ flexDirection: props.reverse ? "row-reverse" : "row" }}
    />
  );
};

PaletteStrip.defaultProps = {
  reverse: false,
};

const GradientContainer = styled.div`
  background: linear-gradient(
    to right,
    ${colors.accentPrimary},
    ${colors.accentSecondary},
    ${colors.accentTertiary},
    ${colors.accentPrimary}
  );

  width: 100%;
  height: 5px;
`;
