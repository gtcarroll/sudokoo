import React from "react";
import styled from "styled-components";

export const ButtonTray = (props) => {
  return <ButtonTrayContainer>{props.children}</ButtonTrayContainer>;
};

ButtonTray.defaultProps = {};

const ButtonTrayContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 1em;

  width: 100%;
`;
