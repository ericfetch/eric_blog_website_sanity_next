import Link from 'next/link';
import './index.css';

interface Feature {
  icon: string;
  text: string;
}

interface AuthInfoProps {
  title: string;
  description: string;
  features: Feature[];
  switchText: string;
  switchLink: string;
  switchBtnText: string;
}

export default function AuthInfo({
  title,
  description,
  features,
  switchText,
  switchLink,
  switchBtnText
}: AuthInfoProps) {
  return (
    <div className="auth-info">
      <div className="info-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="features">
          {features.map((feature, index) => (
            <div className="feature-item" key={index}>
              <i className={feature.icon}></i>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
        <div className="switch-auth">
          <p>{switchText}</p>
          <Link href={switchLink} className="switch-btn">{switchBtnText}</Link>
        </div>
      </div>
    </div>
  );
} 