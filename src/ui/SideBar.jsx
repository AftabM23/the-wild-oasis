import styled from "styled-components";
import MainNav from "./MainNav";

import Logo from "./Logo";
const Aside = styled.aside`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  padding: 3.2rem 2.4rem;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function SideBar() {
  return (
    <Aside>
      <Logo />
      <MainNav />
    </Aside>
  );
}

export default SideBar;
