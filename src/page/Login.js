import React from "react";
import "../page/Login.css";
import { useNavigate, useLocation } from "react-router-dom";

const Login = ({ setAuthenticate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/"; 

  const loginUser = (event) => {
    event.preventDefault();
    console.log("login user function issue");
    setAuthenticate(true);
    navigate(from);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>로그인</h2>
        <p className="login-subtext">
          다양한 할인 혜택과 이벤트, 보너스 쿠폰을 놓치지 마세요
        </p>
      </div>
      <form className="login-form" onSubmit={loginUser}>
        <label>
          이메일 <span className="required">*</span>
          <input type="email" placeholder="이메일" required />
        </label>
        <label>
          비밀번호 <span className="required">*</span>
          <input type="password" placeholder="비밀번호" required />
        </label>
        <div className="login-options">
          <label>
            <input type="checkbox" />
            <p>로그인 상태 유지</p>
          </label>
          <a href="http://localhost:2000/" className="forgot-password">
            비밀번호를 잊으셨나요?
          </a>
        </div>
        <button type="submit" className="login-submit-button">
          로그인
        </button>
      </form>
      <button className="signup-button">회원 가입하기</button>
    </div>
  );
};

export default Login;
