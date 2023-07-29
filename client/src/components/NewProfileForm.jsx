import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner";

const NewProfileForm = ({ username, profileService }) => {
  const [games, setGames] = useState([]);
  const [values, setValues] = useState({ game: "메이플스토리" });
  const [interest, setInterest] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const [text, setText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    profileService
      .getGames()
      .then((games) => setGames(games))
      .catch(setError);
  }, []);

  const setError = (error) => {
    const errorMsg = error.toString();
    if (errorMsg.substr(0, 5) === "Error") {
      setText(errorMsg.substr(7));
    } else {
      setText(errorMsg);
    }
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 5000);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (interest.length < 1) {
      setError("관심사를 한 가지 이상 선택해주세요");
      return;
    }
    profileService
      .postProfile(values, interest)
      .then(() => {
        setValues([]);
      })
      .catch(setError);
    navigate(`/${username}`);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInterest = (event) => {
    const { value } = event.target;
    if (interest.includes(value)) {
      setInterest(
        interest.filter((interest) => {
          return interest !== value;
        })
      );
    } else {
      setInterest((prev) => [...prev, value]);
    }
  };

  return (
    <div className="new-profile-form">
      <form className="profile-form" onSubmit={onSubmit}>
        <h3>{username}님의 새로운 게임 프로필을 완성해보세요!</h3>
        <div>
          <label htmlFor="game">게임 종류</label>
          <select id="game" name="game" onChange={onChange}>
            {games.map((game) => {
              return (
                <option value={game.title} key={game.id}>
                  {game.title}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="">연락처</label>
          <input
            type="text"
            placeholder="디스코드 아이디 / 인게임 닉네임을 입력해주세요"
            name="contact"
            value={values.contact}
            required
            autoFocus
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="">자기소개</label>
          <input
            type="text"
            name="text"
            placeholder="한 줄로 나를 소개해보세요"
            value={values.text}
            required
            autoFocus
            onChange={onChange}
          />
        </div>
        <div>
          게임 실력
          <div className="option-box">
            <div>
              <input
                type="radio"
                name="level"
                id="1"
                value="뉴비"
                required
                autoFocus
                onChange={onChange}
              />
              <label htmlFor="1">뉴비</label>
            </div>
            <div>
              <input
                type="radio"
                name="level"
                id="2"
                value="초보"
                required
                autoFocus
                onChange={onChange}
              />
              <label htmlFor="2">초보</label>
            </div>
            <div>
              <input
                type="radio"
                name="level"
                id="3"
                value="중수"
                required
                autoFocus
                onChange={onChange}
              />
              <label htmlFor="3">중수</label>
            </div>
            <div>
              <input
                type="radio"
                name="level"
                id="4"
                value="고수"
                required
                autoFocus
                onChange={onChange}
              />
              <label htmlFor="4">고수</label>
            </div>
            <div>
              <input
                type="radio"
                name="level"
                id="5"
                value="초고수"
                required
                autoFocus
                onChange={onChange}
              />
              <label htmlFor="5">초고수</label>
            </div>
          </div>
        </div>
        <div>
          관심사
          <div className="option-box">
            <div>
              <input
                type="checkbox"
                name="level"
                id="deco"
                value="꾸미기"
                autoFocus
                onChange={handleInterest}
              />
              <label htmlFor="deco">꾸미기</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="level"
                id="level"
                value="레벨링"
                autoFocus
                onChange={handleInterest}
              />
              <label htmlFor="level">레벨링</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="level"
                id="rank"
                value="랭크/티어"
                autoFocus
                onChange={handleInterest}
              />
              <label htmlFor="rank">랭크/티어</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="level"
                id="boss"
                value="보스/레이드"
                autoFocus
                onChange={handleInterest}
              />
              <label htmlFor="boss">보스/레이드</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="level"
                id="friends"
                value="친목"
                autoFocus
                onChange={handleInterest}
              />
              <label htmlFor="friends">친목</label>
            </div>
          </div>
          <Banner text={text} isAlert={isAlert} transient={true} />
          <div className="button-box">
            <button type="submit" className="form-btn">
              완성하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProfileForm;
