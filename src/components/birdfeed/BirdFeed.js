import React from "react";
import styled from "styled-components";
import { colors, animation } from "../../params.js";

export const BirdFeed = (props) => {
  return (
    <StyledDiv>
      <TweetList>
        {props.feed.map((tweet) => (
          <li
            key={tweet.key}
            onMouseEnter={() => console.log("hello")}
            onMouseLeave={() => console.log("byebye")}
          >
            {tweet.technique.name}
          </li>
        ))}
      </TweetList>
    </StyledDiv>
  );
};

BirdFeed.defaultProps = {
  feed: [],
};

const StyledDiv = styled.div`
  width: 100%;
  text-align: left;
`;

const TweetList = styled.ul`
  height: 80vh;
  margin: 0;
  padding: 0;

  overflow-y: scroll;
  list-style-type: none;

  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  li {
    color: ${colors.accentPrimary};
    border-color: ${colors.accentPrimary};
    background-color: transparent;

    font-size: 24px;
    padding: 0.2em 0.6em 0.4em 0.6em;
    margin-bottom: 0.6em;

    border: 2px solid;
    border-radius: 0.4em;

    transition: ${animation.buttonSpeed};

    &:hover {
      background-color: ${colors.accentPrimaryBG};
    }
  }
`;
