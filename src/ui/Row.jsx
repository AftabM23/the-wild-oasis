import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(prop) =>
    prop.type === "horizontal" &&
    css`
      flex-direction: row;
      justify-content: space-between;
    `}
  ${(prop) =>
    prop.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 2rem;
    `}
`;
Row.defaultProps = {
  type: "vertical",
};

export default Row;
