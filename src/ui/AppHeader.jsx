import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.2rem 4.8rem;
`;

function AppHeader() {
  return <StyledHeader>This is the headetr</StyledHeader>;
}

export default AppHeader;
