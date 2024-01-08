import React from "react";
import Login from "./Login";

const Home = ({ onVerify, onCodeCheck, onSignUp, onLogin }) => {
  return (
    <main>
      <div className="main-hero">
        <div className="text">
          당신과
          <br />
          딱 맞는
          <br />
          게임 친구
        </div>
        <div className="images">
          <img
            className="emoji"
            alt="emoji with sunglasses"
            src="../../../img/emoji.png"
          />
          <img
            className="joystick"
            alt="joystick"
            src="../../../img/joystick.png"
          />
          <img className="trophy" alt="trophy" src="../../../img/trophy.png" />
          <img
            className="red-cross"
            alt="red cross icon"
            src="../../../img/red_cross.png"
          />
          <img
            className="red-cross-2"
            alt="red cross icon"
            src="../../../img/red_cross.png"
          />
          <img
            className="red-cross-3"
            alt="red cross icon"
            src="../../../img/red_cross.png"
          />
        </div>
        <div className="media-images">
          <img src="../../../img/media_img.png" />
        </div>
      </div>
      <span className="info-text">로그인 하신 뒤 이용해주세요</span>
      <span className="info-text">- 테스트 계정 -</span>
      <span style={{ color: "#999", fontSize: "0.9rem" }}>
        아이디: test@test.com
      </span>
      <span style={{ color: "#999", fontSize: "0.9rem" }}>
        비밀번호: 123412341234
      </span>
      <Login
        onVerify={onVerify}
        onCodeCheck={onCodeCheck}
        onSignUp={onSignUp}
        onLogin={onLogin}
      />
    </main>
  );
};

export default Home;
