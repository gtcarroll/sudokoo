import React from "react";
import styled from "styled-components";
import { colors, animation } from "../../params.js";

export const JellyButton = (props) => {
  return (
    <ButtonContainer style={{ flexGrow: props.flexGrow }}>
      <Button
        className={(props.disabled ? "disabled " : "") + props.color}
        onClick={props.disabled ? null : props.onClick}
      >
        {props.text}
      </Button>
    </ButtonContainer>
  );
};

JellyButton.defaultProps = {
  onClick: null,
  text: "click me",
  color: "",
  flexGrow: 1,
  disabled: false,
};

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
`;

const Button = styled.button`
  transition: ${animation.buttonSpeed};

  font-size: 1.5rem;
  padding: 0.4rem 0.4rem 0.8rem 0.4rem;
  width: 100%;

  border: 2px solid;
  border-radius: 2px; //0.4em;

  top: 7px;
  position: absolute;
  box-shadow: 0 0 0 0;

  color: ${colors.neutralHighest};
  border-color: ${colors.neutralHighest};
  background-color: transparent;
  &.primary {
    color: ${colors.accentPrimary};
    border-color: ${colors.accentPrimary};
    &.disabled {
      color: ${colors.accentPrimary50};
      border-color: ${colors.accentPrimary50};
    }
  }
  &.secondary {
    color: ${colors.accentSecondary};
    border-color: ${colors.accentSecondary};
  }
  &.tertiary {
    color: ${colors.accentTertiary};
    border-color: ${colors.accentTertiary};
  }

  &:hover&:not(.disabled) {
    top: 0px;
    box-shadow: 0 7px 0 0;

    &.primary {
      background-color: ${colors.accentPrimaryBG};
    }
    &.secondary {
      background-color: ${colors.accentSecondaryBG};
    }
    &.tertiary {
      background-color: ${colors.accentTertiaryBG};
    }
  }

  &:active&:not(.disabled) {
    top: 7px;
    box-shadow: 0 0 0 0;

    &.primary {
      background-color: ${colors.accentPrimaryPressed};
    }
    &.secondary {
      background-color: ${colors.accentSecondaryPressed};
    }
    &.tertiary {
      background-color: ${colors.accentTertiaryPressed};
    }
  }

  &.disabled {
    &.primary {
      color: ${colors.accentPrimary50};
      border-color: ${colors.accentPrimary50};
    }
    &.secondary {
      color: ${colors.accentSecondary50};
      border-color: ${colors.accentSecondary50};
    }
    &.tertiary {
      color: ${colors.accentTertiary50};
      border-color: ${colors.accentTertiary50};
    }
  }
`;
