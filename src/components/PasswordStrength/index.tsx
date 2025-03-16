import './index.css';

interface PasswordStrengthProps {
  level: number;
}

export default function PasswordStrength({ level }: PasswordStrengthProps) {
  const getStrengthText = () => {
    switch(level) {
      case 0: return '请输入密码';
      case 1: return '弱';
      case 2: return '中';
      case 3: return '强';
      default: return '';
    }
  };

  return (
    <div className="password-strength">
      <div className="strength-bar">
        <div className="strength-level" data-level={level}></div>
      </div>
      <div className="strength-text">{getStrengthText()}</div>
    </div>
  );
} 