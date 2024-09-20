import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import SideBar from "./SideBar";
import styled from "styled-components";

const StyledAppLayOut = styled.div`
  background-color: papayawhip;
  height: 100dvh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;
function AppLayout() {
  return (
    <StyledAppLayOut>
      <AppHeader />
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayOut>
  );
}

export default AppLayout;
