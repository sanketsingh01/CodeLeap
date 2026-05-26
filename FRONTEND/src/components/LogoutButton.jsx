import React from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ children }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <button
      className="btn bg-[#F4FF54] text-black text-base font-semibold hover:bg-[#F4FF54]/80"
      onClick={onLogout}
    >
      {children}
    </button>
  );
};

export default LogoutButton;
