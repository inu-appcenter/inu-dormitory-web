import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import buy from "../../assets/bottombar/buy.svg";
import chat from "../../assets/bottombar/chat.svg";
import home from "../../assets/bottombar/home.svg";
import roommate from "../../assets/bottombar/roommate.svg";
import mypage from "../../assets/bottombar/mypage.svg";

// 클릭된 이미지 import
import buyClicked from "../../assets/bottombar/buy-clicked.svg";
import chatClicked from "../../assets/bottombar/chat-clicked.svg";
import homeClicked from "../../assets/bottombar/home-clicked.svg";
import roommateClicked from "../../assets/bottombar/roommate-clicked.svg";
import mypageClicked from "../../assets/bottombar/mypage-clicked.svg";
import TooltipMessage from "./TooltipMessage.tsx";
import { useState } from "react";

interface ButtonProps {
  defaultImg: string;
  clickedImg: string;
  buttonName: string;
  isActive: boolean;
  onClick: () => void;
  showTooltip?: boolean;
  onTooltipClose?: () => void;
}

const Button = ({
  defaultImg,
  clickedImg,
  buttonName,
  isActive,
  onClick,
  showTooltip = false,
  onTooltipClose,
}: ButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <ButtonWrapper onClick={handleClick}>
      {showTooltip && onTooltipClose && (
        <TooltipMessage
          message="나와 가장 어울리는 룸메이트를 찾아보세요!"
          onClose={onTooltipClose}
        />
      )}

      <img src={isActive ? clickedImg : defaultImg} alt={buttonName} />
      <div className={`BtnName ${isActive ? "active" : ""}`}>{buttonName}</div>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  position: relative; /* Tooltip 위치 기준 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 100%;
  gap: 5px;
  cursor: pointer;

  .BtnName {
    font-size: 10px;
    color: #000;
    min-width: fit-content;
  }

  .BtnName.active {
    color: #0a84ff;
  }
`;

export default function BottomBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const [showTooltip, setShowTooltip] = useState(() => {
    const stored = localStorage.getItem("showRoommateTooltip");
    return stored !== "false"; // 기본값 true
  });

  const hideTooltip = () => {
    console.log("툴팁 숨김 처리");
    setShowTooltip(false);
    localStorage.setItem("showRoommateTooltip", "false");
  };

  if (
    pathname.includes("/chat/roommate") ||
    pathname.includes("/chat/groupPurchase")
  ) {
    return null;
  }

  return (
    <StyledFooter>
      <Button
        defaultImg={home}
        clickedImg={homeClicked}
        buttonName="홈"
        isActive={pathname === "/home"}
        onClick={() => navigate("/home")}
      />
      <Button
        defaultImg={roommate}
        clickedImg={roommateClicked}
        buttonName="룸메이트"
        isActive={pathname === "/roommate"}
        onClick={() => {
          navigate("/roommate");
        }}
        showTooltip={showTooltip}
        onTooltipClose={hideTooltip}
      />
      <Button
        defaultImg={buy}
        clickedImg={buyClicked}
        buttonName="공동구매"
        isActive={pathname === "/groupPurchase"}
        onClick={() => navigate("/groupPurchase")}
      />
      <Button
        defaultImg={chat}
        clickedImg={chatClicked}
        buttonName="채팅"
        isActive={pathname === "/chat"}
        onClick={() => navigate("/chat")}
      />
      <Button
        defaultImg={mypage}
        clickedImg={mypageClicked}
        buttonName="마이페이지"
        isActive={pathname === "/mypage"}
        onClick={() => navigate("/mypage")}
      />
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 74px;
  padding: 0 20px;
  box-sizing: border-box;

  background: rgba(244, 244, 244, 0.6); /* 반투명 */
  backdrop-filter: blur(10px); /* 블러 효과 */
  -webkit-backdrop-filter: blur(10px); /* Safari 지원 */

  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;
