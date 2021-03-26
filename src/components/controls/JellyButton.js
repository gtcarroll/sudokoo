import React from "react";
import styled from "styled-components";
import { colors, animation } from "../../params.js";

export const JellyButton = (props) => {
  return (
    <ButtonContainer>
      <Button className={props.color} onClick={props.onClick}>
        {props.text}
      </Button>
    </ButtonContainer>
  );
};

JellyButton.defaultProps = {
  doubleWidth: false,
  onClick: console.log("clicked"),
  text: "click me",
  color: "",
};

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  padding-top: 0.3em;
`;

const Button = styled.button`
  position: absolute;
  z-index: 13;

  color: ${colors.neutralHighest};
  background-color: transparent;

  border: 2px solid ${colors.neutralHighest};
  border-radius: 1em;

  padding: 0.2em 0.2em 0.3em 0.2em;
  font-size: 24px;

  width: 100%;

  transition: all ${animation.buttonSpeed} ease-in;

  &:hover,
  &:focus {
    padding-bottom: 1.3em;
    transform: translateY(-1em);

    color: ${colors.neutralLowest};
    background-color: ${colors.neutralHighest};

    &.highlight {
      color: ${colors.neutralLowest};
      background-color: ${colors.accentHighlight};
    }
    &.highlightAlt {
      color: ${colors.neutralLowest};
      background-color: ${colors.accentHighlightAlt};
    }
    &.removal {
      color: ${colors.neutralLowest};
      background-color: ${colors.accentRemoval};
    }
  }

  &:active {
    transition-duration: 0.05s;
    padding-bottom: 0.5em;
    transform: translateY(-0.2em) scale(1.075, 1);
  }

  &.highlight {
    color: ${colors.accentHighlight};
    border-color: ${colors.accentHighlight};
  }

  &.highlightAlt {
    color: ${colors.accentHighlightAlt};
    border-color: ${colors.accentHighlightAlt};
  }

  &.removal {
    color: ${colors.accentRemoval};
    border-color: ${colors.accentRemoval};
  }
`;
