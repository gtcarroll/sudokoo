import React from "react";
import styled from "styled-components";
import { colors } from "./../../params.js";

export const BorderBox = (props) => {
  return (
    <StyledDiv
      style={{
        zIndex: props.zIndex,
        borderTop: props.borders[0]
          ? props.borderStyle
          : props.base
          ? "1px solid " + colors.neutralHigh50
          : "",
        borderRight: props.borders[1]
          ? props.borderStyle
          : props.base
          ? "1px solid " + colors.neutralHigh50
          : "",
        borderBottom: props.borders[2]
          ? props.borderStyle
          : props.base
          ? "1px solid " + colors.neutralHigh50
          : "",
        borderLeft: props.borders[3]
          ? props.borderStyle
          : props.base
          ? "1px solid " + colors.neutralHigh50
          : "",
      }}
    />
  );
};

BorderBox.defaultProps = {
  borders: [false, false, false, false],
  borderStyle: "",
  zIndex: 100,
  base: false,
};

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
`;
