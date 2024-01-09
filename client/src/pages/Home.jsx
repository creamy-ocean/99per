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
      <h3>
        호스팅 서버가 자동으로 슬립 모드로 전환되기 때문에
        <br />첫 요청을 보낼 때 시간이 조금 소요될 수 있습니다
        <br />
        로그인 버튼 클릭 후 1분 정도 지난 뒤 다시 로그인 시도 부탁드립니
      </h3>
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
