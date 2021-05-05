import React from "react";
import styled from "styled-components";
import { colors, animation } from "../../params.js";

export const JellyButton = (props) => {
  return (
    <ButtonContainer style={{ flexGrow: props.flexGrow }}>
      <Button
        className={
          (props.disabled ? "disabled " : "") +
          (props.solved ? "solved " : "") +
          props.color
        }
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
  solved: false,
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

  color: ${colors.neutral4};
  border-color: ${colors.neutral4};
  background-color: transparent;
  &.primary {
    color: ${colors.primary};
    border-color: ${colors.primary};
    &.disabled {
      color: ${colors.primary50};
      border-color: ${colors.primary50};
    }
  }
  &.secondary {
    color: ${colors.secondary};
    border-color: ${colors.secondary};
  }
  &.tertiary {
    color: ${colors.tertiary};
    border-color: ${colors.tertiary};
  }

  &:hover&:not(.disabled) {
    top: 0px;
    box-shadow: 0 7px 0 0;

    &.primary {
      background-color: ${colors.primary15};
    }
    &.secondary {
      background-color: ${colors.secondary15};
    }
    &.tertiary {
      background-color: ${colors.tertiary15};
    }
  }

  &:active&:not(.disabled) {
    top: 7px;
    box-shadow: 0 0 0 0;

    &.primary {
      background-color: ${colors.primary25};
    }
    &.secondary {
      background-color: ${colors.secondary25};
    }
    &.tertiary {
      background-color: ${colors.tertiary25};
    }
  }

  &.disabled {
    &.primary {
      color: ${colors.primary50};
      border-color: ${colors.primary50};
    }
    &.secondary {
      color: ${colors.secondary50};
      border-color: ${colors.secondary50};
    }
    &.tertiary {
      color: ${colors.tertiary50};
      border-color: ${colors.tertiary50};
    }
  }

  &.solved {
    color: ${colors.secondary};
    padding: 0.5rem 0.4rem 0.7rem 0.4rem;
    background: conic-gradient(
      from 20deg at 50%,
      ${colors.primary15} 40deg,
      ${colors.secondary15} 130deg,
      ${colors.tertiary15} 230deg,
      ${colors.primary15} 320deg
    );
    border-image: conic-gradient(
        from 20deg at 50%,
        ${colors.primary} 40deg,
        ${colors.secondary} 130deg,
        ${colors.tertiary} 230deg,
        ${colors.primary} 320deg
      )
      2;
  }
`;
