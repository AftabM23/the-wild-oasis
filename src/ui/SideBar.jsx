import styled from "styled-components";

const Aside = styled.aside`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  padding: 3.2rem 2.4rem;
  grid-row: 1/-1;
`;
function SideBar() {
  return <Aside>SideBAr</Aside>;
}

export default SideBar;
