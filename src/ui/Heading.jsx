import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(prop) =>
    prop.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 700;
    `}

  ${(prop) =>
    prop.as === "h2" &&
    css`
      font-size: 2rem;
    `}

    ${(prop) =>
    prop.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 400;
    `}
  border:2px solid white;
`;

export default Heading;
