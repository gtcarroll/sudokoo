import React, { useState } from "react";
import styled from "styled-components";
import { PaletteStrip } from "./../components/PaletteStrip.js";
import { Hlt } from "./../components/birdfeed";
import { colors, animation } from "./../params.js";
import gacarrProfile from "./../assets/gacarr_profile.jpg";
import bearyTeaProfile from "./../assets/b-tea_profile.png";
import socialLinkedIn from "./../assets/linked-in_logo.png";
import socialGitHub from "./../assets/github_logo.png";
import socialInstagram from "./../assets/instagram_logo.png";
import socialTwitter from "./../assets/twitter_logo.png";
import kofiButton from "./../assets/kofi_button.png";
import heartOn from "./../assets/heart_on.png";
import heartOff from "./../assets/heart_off.png";

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
          <span className="heart">
            <img draggable="false" src={heartOn} alt="pink heart" />
          </span>
        ) : (
          <span className="heart">
            <img draggable="false" src={heartOff} alt="pink heart outline" />
          </span>
        )}
      </button>
      <LoveContainer>
        <div className="about">
          <div>
            Sudokoo was created to share the joy of sudoku in a way that is
            intuitive &amp; fun.
          </div>{" "}
          <div>
            If you'd like to see more <Hlt className="ter">accessible</Hlt>,{" "}
            <Hlt className="sec">ad-free</Hlt>, &amp;{" "}
            <Hlt className="pri">open-source</Hlt> experiences on the web,
            please consider supporting me on Ko-Fi!
          </div>
          <button
            className={(toggle ? "show " : "hide ") + "kofi"}
            onClick={() => window.open("https://ko-fi.com/gacarr")}
            tabIndex={toggle ? "0" : "-1"}
          ></button>
        </div>
        <div className="credits">
          <div className="credit">
            <div className="name">Gabe Carroll</div>
            <div className="title">Design &amp; Engineering</div>
            <img
              draggable="false"
              className={(toggle ? "show " : "hide ") + "photo gaca"}
              src={gacarrProfile}
              alt="Gabe's profile"
              onClick={() => window.open("https://github.com/gtcarroll")}
            />
            <div className="social">
              <img
                draggable="false"
                src={socialGitHub}
                alt="GitHub logo"
                onClick={() => window.open("https://github.com/gtcarroll")}
              />
              <img
                draggable="false"
                src={socialLinkedIn}
                alt="LinkedIn logo"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/gabe-carroll-443197107/"
                  )
                }
              />
            </div>
          </div>
          <div className="credit">
            <div className="name">BearyMilkTea</div>
            <div className="title">Illustration</div>
            <img
              draggable="false"
              className={(toggle ? "show " : "hide ") + "photo b-tea"}
              src={bearyTeaProfile}
              alt="Beary Milk Tea's profile"
              onClick={() => window.open("https://bearymilktea.carrd.co/")}
            />
            <div className="social">
              <img
                className="b-tea"
                draggable="false"
                src={socialInstagram}
                alt="Instagram logo"
                onClick={() =>
                  window.open("https://www.instagram.com/bearymilktea/")
                }
              />
              <img
                className="b-tea"
                draggable="false"
                src={socialTwitter}
                alt="Twitter logo"
                onClick={() => window.open("https://twitter.com/bearymilktea")}
              />
            </div>
          </div>
        </div>
      </LoveContainer>
    </StyledDiv>
  );
};

Credits.defaultProps = {
  dropToggle: false,
};

const LoveContainer = styled.div`
  display: grid;
  grid-template-rows: 21rem 13rem;
  grid-template-areas: "about" "credits";

  position: absolute;
  z-index: 1000;
  bottom: 0;

  height: 34rem;
  max-width: 100vw;
  padding-right: 6rem;

  .about {
    grid-area: about;

    width: calc(100vw - 10rem);
    color: ${colors.neutral5};

    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;

    font-size: 1.5rem;
    padding: 1rem 2rem 1.5rem 2rem;
    margin: auto 0;
    text-align: center;

    div {
      padding: 0 0 1.5rem 0;
      max-width: 31rem;
    }

    text-align: center;
    padding-bottom: 0.5rem;

    .kofi {
      top: 0.3rem;
      position: relative;

      height: 3.5rem;
      width: 20.685rem;
      border-radius: 0.75rem;
      border: none;
      background: url(${kofiButton});
      background-size: 100% 100%;

      transition: ${animation.buttonSpeed};
      cursor: pointer;

      &:hover {
        top: -0.3rem;
        box-shadow: 0 0.2rem 0 0 ${colors.secondary},
          0 0.4rem 0 0 ${colors.primary}, 0 0.6rem 0 0 ${colors.tertiary};
      }
      &:active {
        top: 0.3rem;
        box-shadow: 0 0 0 0 ${colors.secondary}, 0 0 0 0 ${colors.primary},
          0 0 0 0 ${colors.tertiary};
      }
    }
  }

  .credits {
    grid-area: credits;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .credit {
      display: grid;
      grid-template-rows: 2.5rem 3.5rem 4rem;
      grid-template-columns: 10.5rem 13.5rem;
      grid-template-areas:
        "photo name"
        "photo title"
        "photo social";

      padding: 1rem;

      .photo {
        grid-area: photo;

        max-height: 8rem;
        padding: 0.5rem 0.5rem 1.5rem 0.5rem;
        margin-right: 1rem;
        border-radius: 2px;

        background-color: #fff;
        cursor: pointer;

        transition: all ${animation.halfSpeed} ease-in-out,
          box-shadow ${animation.buttonSpeed};

        &.hide {
          &.gaca {
            transform: translate(0, -10rem) rotate(7deg);
          }
          &.b-tea {
            transform: translate(0, -10rem) rotate(-10deg);
          }
        }
        &.gaca {
          transform: rotate(-2deg);
          &:hover {
            box-shadow: 0 0 0 0.3rem ${colors.primary};
          }
          &:active {
            box-shadow: 0 0 0 0.15rem ${colors.primary};
          }
        }
        &.b-tea {
          transform: rotate(3deg);
          &:hover {
            box-shadow: 0 0 0 0.3rem ${colors.secondary};
          }
          &:active {
            box-shadow: 0 0 0 0.15rem ${colors.secondary};
          }
        }
      }
      .name {
        grid-area: name;

        font-size: 1.5rem;
        white-space: nowrap;

        color: ${colors.neutral5};
      }
      .title {
        grid-area: title;

        font-size: 1.4rem;
        white-space: nowrap;

        color: ${colors.neutral4};
      }
      .social {
        grid-area: social;

        img {
          height: 2.5rem;
          width: 2.5rem;
          margin-right: 1rem;

          border: 2px solid ${colors.neutral4};
          border-radius: 1.5rem;

          transition: ${animation.buttonSpeed};

          &:hover {
            border-color: ${colors.primary};
            &.b-tea {
              border-color: ${colors.secondary};
            }
            cursor: pointer;
            transform: scale(1.1);
          }
          &:active {
            border-color: ${colors.primary};
            &.b-tea {
              border-color: ${colors.secondary};
            }
            transform: scale(0.96, 0.94);
          }
        }
      }
    }
  }

  @media (orientation: portrait) {
    grid-template-rows: 24rem 23rem; //20rem 4rem 23rem;
    height: 47rem;
    width: calc(100vw - 6rem);

    .about {
      width: calc(100vw - 9rem);
      text-align: left;
    }
    .credits {
      flex-direction: column;
      .credit {
        grid-template-rows: 2rem 2.5rem 3.5rem;
        grid-template-columns: 9.5rem 15rem;
        .name {
          font-size: 1.4rem;
        }
        .title {
          font-size: 1.25rem;
        }
        .photo {
          max-height: 7rem;
          padding: 0.3rem 0.3rem 1rem 0.3rem;

          &.hide {
            &.gaca {
              transform: translate(0, -10rem) rotate(-10deg) !important;
            }
            &.b-tea {
              transform: translate(0, -10rem) rotate(7deg) !important;
            }
          }
          &.gaca {
            transform: rotate(1deg) !important;
          }
          &.b-tea {
            transform: rotate(-2deg) !important;
          }
        }
      }
    }
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
    height: 34rem;
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
    height: 36.5rem;

    display: flex;
    align-content: center;
    text-align: center;

    span {
      width: 100%;
      height: 3rem;

      &.heart {
        height: 1.7rem;
        img {
          height: 1.4rem;
        }
      }
    }
  }

  @media (orientation: portrait) {
    &.show {
      height: 47rem;
    }
    .heart-ribbon {
      height: 49.5rem;
      span {
        height: 4.5rem;
      }
    }
  }
`;
