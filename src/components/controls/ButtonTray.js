import React from "react";
import styled from "styled-components";
import { animation, colors } from "../../params.js";
import { JellyButton } from "./";

export const ButtonTray = (props) => {
  return (
    <ButtonTrayContainer>
      {props.tertiary ? (
        <JellyButton
          text={props.tertiary.text}
          onClick={props.tertiary.onClick}
          flexGrow={props.tertiary.flexGrow}
          disabled={props.tertiary.disabled}
          failed={props.tertiary.failed}
          color="tertiary"
          padding="right"
        />
      ) : (
        <JellyButton hidden disabled color="tertiary" />
      )}
      {props.secondary ? (
        <JellyButton
          text={props.secondary.text}
          onClick={props.secondary.onClick}
          flexGrow={props.secondary.flexGrow}
          disabled={props.secondary.disabled}
          solved={props.secondary.solved}
          color="secondary"
        />
      ) : (
        <JellyButton hidden disabled color="secondary" />
      )}
      {props.primary ? (
        <JellyButton
          text={props.primary.text}
          onClick={props.primary.onClick}
          flexGrow={props.primary.flexGrow}
          disabled={props.primary.disabled}
          color="primary"
          padding="left"
        />
      ) : (
        <JellyButton hidden disabled color="primary" />
      )}
    </ButtonTrayContainer>
  );
};

ButtonTray.defaultProps = {
  primary: false,
  secondary: false,
  tertiary: false,
};

const ButtonTrayContainer = styled.div`
  transition: ${animation.buttonSpeed};
  background-color: ${colors.neutral0};

  position: relative;
  z-index: 105;

  display: flex;
  flex-direction: row;
  flex: 1;

  width: 100%;
  height: 10rem;
`;
