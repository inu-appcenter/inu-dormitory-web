// src/pages/LogoutPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore.ts";
import { TokenInfo } from "../types/members.ts";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { setTokenInfo } = useUserStore();

  useEffect(() => {
    // 로그아웃 처리
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    const emptyTokenInfo: TokenInfo = {
      accessToken: "",
      refreshToken: "",
    };
    setTokenInfo(emptyTokenInfo);
    alert("로그아웃되었습니다.");
    // 처리 완료 즉시 이동
    navigate("/home");
  }, [navigate, setTokenInfo]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>로그아웃 처리 중입니다...</p>
    </div>
  );
};

export default LogoutPage;
