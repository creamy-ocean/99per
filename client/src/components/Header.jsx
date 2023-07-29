import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const Header = memo(({ username, onLogout, onMyProfiles, onAllProfiles }) => {
  const navigate = useNavigate();

  const onClick = (event) => {
    event.preventDefault();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="logo" onClick={onClick}>
        <h1 className="logo-name">99%</h1>
      </div>
      <nav className="menu">
        {username && (
          <>
            <span className="user-name">{username}님</span>
            <button onClick={onAllProfiles}>찾기</button>
            <button onClick={onMyProfiles}>내 프로필</button>
            <button onClick={onLogout}>로그아웃</button>
          </>
        )}
      </nav>
    </header>
  );
});

export default Header;
