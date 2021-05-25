import React, { useState } from "react";
import styled from "styled-components";
import { PaletteStrip } from "./../components/PaletteStrip.js";
import { colors, animation } from "./../params.js";
import gacarrProfile from "./../assets/gacarr_profile.jpg";
import kofiButton from "./../assets/kofi_button.png";

export const Credits = (props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <StyledDiv className={toggle ? "show " : "hide "}>
      <PaletteStrip />
      <button
        className="heart-ribbon"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <span> </span>
        <span>T</span>
        <span>H</span>
        <span>A</span>
        <span>N</span>
        <span>K</span>
        <span> </span>
        <span>Y</span>
        <span>O</span>
        <span>U</span>
        <span> </span>
        {toggle ? (
          <span className="heart">&#9829;</span>
        ) : (
          <span className="heart">&#9825;</span>
        )}
      </button>
      <CreditsContainer>
        <div className="thanks"></div>
        <div className="support">
          <img
            className="kofi"
            src={kofiButton}
            alt="Support me on Ko-fi"
            onClick={() => window.open("https://ko-fi.com/gacarr")}
          />
        </div>
        <div className="credits gabe"></div>
        <div className="credits b-tea"></div>
      </CreditsContainer>
      {/* </div>
        <div className="title">
          <div>
            <div className="contribution">Design &amp; Engineering</div>
            <div className="name">Gabe Carroll</div>
          </div>
          <img className="button" src={kofiButton} alt="Support me on Ko-fi" />
        </div>
        <img className="profile" src={gacarrProfile} /> */}
      {/* <img className="button" src={kofiButton} alt="Support me on Ko-fi" /> */}
    </StyledDiv>
  );
};

Credits.defaultProps = {
  dropToggle: false,
};

const CreditsContainer = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1000;

  max-width: 100vw;
  height: 30rem;
  padding-right: 5rem;

  display: grid;
  grid-template-rows: 4fr 4.6rem 2fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "thnks thnks"
    "spprt spprt"
    "crdtL crdtR";

  div {
    width: calc(100vw - 5rem);
    &.credits {
      width: calc(50vw - 2.5rem);
    }
  }

  .thanks {
    grid-area: thnks;
    background-color: burlywood;
  }

  .support {
    grid-area: spprt;
    text-align: center;

    .kofi {
      height: 4rem;
      margin-top: 0.3rem;
      border-radius: 0.75rem;

      transition: ${animation.buttonSpeed};
      cursor: pointer;

      &:hover {
        transform: translateY(-0.6rem);
        box-shadow: 0 0.2rem 0 0 ${colors.secondary},
          0 0.4rem 0 0 ${colors.primary}, 0 0.6rem 0 0 ${colors.tertiary};
      }
      &:active {
        transform: translateY(0rem);
        box-shadow: 0 0 0 0 ${colors.secondary}, 0 0 0 0 ${colors.primary},
          0 0 0 0 ${colors.tertiary};
      }
    }
  }

  .gabe {
    grid-area: crdtL;
    background-color: lavenderblush;
  }

  .b-tea {
    grid-area: crdtR;
    background-color: rosybrown;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  transition: all ${animation.buttonSpeed}, height ${animation.halfSpeed} ease,
    width 0s;
  background-color: ${colors.neutral1};
  position: absolute;
  z-index: 1000;
  width: 100%;

  filter: drop-shadow(0px 1rem 2rem ${colors.neutral0});

  &.hide {
    height: 0;
  }

  &.show {
    height: 30rem;
  }

  .heart-ribbon {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    filter: drop-shadow(-0rem 0rem 0.5rem ${colors.neutral0});
    &:hover {
      background-color: ${colors.tertiary25f};
    }
    &:active {
      background-color: ${colors.tertiary50f};
    }

    color: ${colors.tertiary};
    background-color: ${colors.tertiary15f};
    border: solid 2px ${colors.tertiary};
    border-top: 0px;
    border-radius: 0 0 2rem 2rem;

    font-size: 1.5rem;
    font-weight: 500;
    padding: 0.2rem;

    position: absolute;
    z-index: 1003;
    float: right;
    bottom: calc(-2rem - 5px);
    right: 2rem;
    @media (orientation: portrait) {
      right: 1rem;
    }
    width: 4rem;
    height: 32.5rem;

    display: flex;
    align-content: center;

    span {
      width: 100%;
      height: 3rem;

      &.heart {
        height: 2rem;
      }
    }
  }
`;
