import './index.css';

export default function SocialLogin() {
  return (
    <div className="social-login">
      <button className="social-btn github">
        <i className="fab fa-github"></i>
        <span>GitHub 登录</span>
      </button>
      <button className="social-btn google">
        <i className="fab fa-google"></i>
        <span>Google 登录</span>
      </button>
    </div>
  );
} 