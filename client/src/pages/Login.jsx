import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import ImageService from "../service/image";

export default function Login({ onVerify, onCodeCheck, onSignUp, onLogin }) {
  const [signup, isSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, isEmailValid] = useState(false);
  const [verify, isVerify] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [isChecked, setIsChecked] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("f");
  const [birthDate, setBirthDate] = useState(2022);
  const [image, setImage] = useState(undefined);
  const [text, setText] = useState("");
  const [isAlert, setIsAlert] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const imageService = new ImageService();
  const year = new Date().getFullYear();

  useEffect(() => {
    if (isSignup) {
      isVerify(false);
      setEmailCode("");
      setUsername("");
      setPassword("");
      setText("");
      setIsAlert("");
      setGender("");
      setBirthDate(2022);
      setImage("");
      setImageSrc("");
    }
    setEmail("");
    isEmailValid(false);
  }, [signup]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (signup) {
      image
        ? imageService.upload(image).then((result) => {
            console.log(result);
            onSignUp(
              email,
              username,
              password,
              gender,
              birthDate,
              result
            ).catch(setError);
          })
        : onSignUp(email, username, password, gender, birthDate, image).catch(
            setError
          );
    } else {
      onLogin(email, password).catch(setError);
    }
  };

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

  const validEmailCheck = (value) => {
    const pattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return value.match(pattern) != null;
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    switch (name) {
      case "email":
        if (!validEmailCheck(value)) {
          return (function () {
            isEmailValid(false);
            isVerify(false);
            setEmail(value);
          })();
        } else {
          return (function () {
            isEmailValid(true);
            setEmail(value);
          })();
        }
      case "emailcode":
        return setEmailCode(value);
      case "username":
        return setUsername(value);
      case "password":
        return setPassword(value);
      case "gender":
        return setGender(value);
      case "birthDate":
        return setBirthDate(value);
      case "image":
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
          const image = e.target.files[0];
          if (image.size > 1024 * 1024 * 5) {
            value = "";
            setText("5MB를 초과하는 이미지는 업로드 할 수 없습니다");
            break;
          } else {
            handleImageChange(image);
            setImage(image);
          }
        }
        break;
    }
  };

  const onSignupToggle = (event) => {
    event.preventDefault();
    isSignup((prev) => !prev);
    isVerify(false);
    setIsChecked("");
    setError("");
  };

  const onVerifyToggle = (event) => {
    event.preventDefault();
    onVerify(email).then(isVerify(true)).catch(setError);
  };

  const onCodeSubmit = (event) => {
    event.preventDefault();
    const checked = onCodeCheck(emailCode);
    if (!checked) {
      return setIsChecked(false);
    }
    isEmailValid(false);
    setIsChecked(true);
  };

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      console.log("drag!!");
      setDragActive(true);
    } else if (e.type === "dragleave") {
      console.log("drag leave!!");
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const handleImageChange = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  return (
    <div>
      <section className="login-section">
        <form name="signin-form" autoComplete="off" onSubmit={onSubmit}>
          <div className={signup ? "email-box" : "input-box"}>
            <label htmlFor="이메일" name="email">
              이메일
            </label>
            <input
              name="email"
              type="email"
              placeholder="이메일 주소를 입력해주세요"
              value={email}
              onChange={onChange}
              className="form-input"
              disabled={isChecked ? true : false}
            />
            {signup && (
              <button
                htmlType="button"
                onClick={onVerifyToggle}
                disabled={emailValid ? false : true}
              >
                인증
              </button>
            )}
          </div>
          <div className="result-box">
            {isChecked && <>인증 완료되었습니다</>}
          </div>
          {verify && !isChecked && (
            <div class="verify-box">
              <label htmlFor="인증 번호" name="emailcode">
                인증 번호
              </label>
              <input
                name="emailcode"
                type="text"
                placeholder="인증 번호를 입력하세요"
                value={emailCode}
                onChange={onChange}
                className="form-input"
              />
              <button htmlType="button" onClick={onCodeSubmit}>
                확인
              </button>
            </div>
          )}
          {isChecked === false && (
            <div className="result-box">인증 번호가 일치하지 않습니다</div>
          )}
          {signup && (
            <div className="input-box">
              <label htmlFor="닉네임" name="username">
                닉네임
              </label>
              <input
                name="username"
                type="text"
                placeholder="2글자 이상 입력해주세요"
                value={username}
                onChange={onChange}
                className="form-input"
              />
            </div>
          )}
          <div className="input-box">
            <label htmlFor="비밀번호" name="password">
              비밀번호
            </label>
            <input
              name="password"
              type="password"
              placeholder="10~12자로 입력해주세요"
              value={password}
              className="form-input"
              onChange={onChange}
            />
          </div>
          {signup && (
            <>
              <div className="gender-box">
                <h3>성별</h3>
                <div className="gender">
                  <div className="gender-option">
                    <div>
                      <input
                        name="gender"
                        id="f"
                        value="f"
                        type="radio"
                        onChange={onChange}
                      />
                      <label htmlFor="f">여성</label>
                    </div>
                    <div>
                      <input
                        name="gender"
                        id="m"
                        value="m"
                        type="radio"
                        onChange={onChange}
                      />
                      <label htmlFor="m">남성</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="input-box">
                <label htmlFor="birthDate" name="birthDate">
                  태어난 연도
                </label>
                <input
                  name="birthDate"
                  type="number"
                  min="1900"
                  max={year}
                  step="1"
                  defaultValue={birthDate}
                  onChange={onChange}
                />
              </div>
              <div
                className="image-box"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                프로필 이미지
                <div>
                  {imageSrc ? (
                    <img src={imageSrc} alt="product image" className="w-1/2" />
                  ) : (
                    <i className="fa-regular fa-image icon"></i>
                  )}
                  <label htmlFor="image">
                    클릭 또는 드래그, 드롭으로 업로드 해주세요
                    <input
                      id="image"
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={onChange}
                    />
                  </label>
                </div>
              </div>
            </>
          )}
          <Banner text={text} isAlert={isAlert} />
          <div className="button-box">
            {signup ? (
              <button htmlType="button" onClick={onSignupToggle}>
                로그인
              </button>
            ) : (
              <button htmlType="submit">로그인</button>
            )}
            {signup ? (
              <button htmlType="submit">회원가입</button>
            ) : (
              <button htmlType="button" onClick={onSignupToggle}>
                회원가입
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
