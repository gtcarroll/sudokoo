import React from "react";
import styled from "styled-components";
import { colors, animation } from "../../params.js";

export const JellyButton = (props) => {
  return (
    <ButtonContainer
      style={{ flexGrow: props.flexGrow }}
      className={props.padding}
    >
      <Button
        className={
          (props.disabled ? "disabled " : "") +
          (props.solved ? "solved " : "") +
          (props.hidden ? "hidden " : "") +
          props.padding +
          " " +
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
  text: "",
  color: "",
  flexGrow: 0,
  disabled: false,
  solved: false,
  hidden: false,
  padding: "",
};

const ButtonContainer = styled.div`
  transition: ${animation.buttonSpeed};
  position: relative;
  display: flex;
  &.left {
    padding-left: 1rem;
  }
  &.right {
    padding-right: 1rem;
  }
`;

const Button = styled.button`
  transition: ${animation.buttonSpeed}, color ${animation.halfSpeed},
    border-color ${animation.halfSpeed};

  font-size: 1.5rem;
  padding: 0.4rem 0.4rem 0.8rem 0.4rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;

  &.right,
  &.left {
    width: calc(100% - 1rem);
  }

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

  &.hidden {
    width: 0;
    border: none;
    flex-grow: 0;
  }

  &.disabled {
    &.primary {
      color: ${colors.primary50};
      border-color: ${colors.primary50};
    }
    &.secondary {
      color: ${colors.secondary50};
      border-color: ${colors.secondary50};
      &.solved {
        color: ${colors.secondary};
      }
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
