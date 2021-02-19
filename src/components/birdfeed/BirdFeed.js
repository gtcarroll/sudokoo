import React from "react";
import styled from "styled-components";

export const BirdFeed = (props) => {
  return (
    <StyledDiv>
      <h1>BirdFeed</h1>
      {props.feed}
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
