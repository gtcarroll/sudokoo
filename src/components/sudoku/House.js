import React from "react";
import styled from "styled-components";
import { colors } from "./../../params.js";

export const House = (props) => {
  return <StyledDiv>{props.children}</StyledDiv>;
};

House.defaultProps = {};

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);

  height: 100%;
  width: 100%;
  background-color: ${colors.sudokuBG1};
  border: 1px solid ${colors.sudokuBorder};

  box-sizing: border-box;
`;
