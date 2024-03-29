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
          (props.failed ? "failed " : "") +
          (props.hidden ? "hidden " : "") +
          props.padding +
          " " +
          props.color
        }
        onClick={props.disabled ? null : props.onClick}
        tabIndex={props.disabled ? "-1" : "0"}
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
  transition: ${animation.buttonSlowSpeed} ease-in;
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
  transition: ${animation.buttonSpeed}, color ${animation.buttonSlowSpeed},
    border-color ${animation.buttonSlowSpeed};

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
  border-radius: 2px;

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

  @media (orientation: portrait) {
    &:not(.disabled) {
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
  }

  &:hover:not(.disabled) {
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

  &:active:not(.disabled) {
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
    border-color: transparent !important;
    color: transparent !important;
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
      &.failed {
        color: ${colors.tertiary};
        border-color: ${colors.tertiary50};
        background-color: ${colors.tertiary15};
      }
    }
  }

  &.solved,
  &.failed {
    padding: 0.5rem 0.4rem 0.7rem 0.4rem;
  }

  &.solved {
    color: ${colors.secondary};
    padding: 0.5rem 0.4rem 0.7rem 0.4rem;
    background: conic-gradient(
      ${colors.primary15} 0deg,
      ${colors.secondary15} 120deg,
      ${colors.tertiary15} 240deg,
      ${colors.primary15} 360deg
    );
    border-image: conic-gradient(
        ${colors.primary} 0deg,
        ${colors.secondary} 120deg,
        ${colors.tertiary} 240deg,
        ${colors.primary} 360deg
      )
      2;
  }
`;
