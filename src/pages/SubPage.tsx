import { Outlet } from "react-router-dom";
import styled from "styled-components";

export default function SubPage() {
  return (
    <SubPageWrapper>
      {/*<Header hasBack={true} />*/}
      <Outlet />
      {/*<BottomBar />*/}
    </SubPageWrapper>
  );
}

const SubPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
