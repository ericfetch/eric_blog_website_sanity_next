import './index.css';
interface Link {
  icon: string;
  url: string;
  label: string;
}

interface AuthorCardProps {
  name: string;
  avatar: string;
  bio: string;
  links: Link[];
}

const AuthorCard = ({ name, avatar, bio, links }: AuthorCardProps) => {
  return (
    <div className="author-card">
      <div className="author-avatar">
        <img src={avatar} alt={`${name}的头像`} />
      </div>
      <div className="author-details">
        <h3 className="author-name">{name}</h3>
        <p className="author-bio">{bio}</p>
        <div className="author-links">
          {links.map((link, index) => (
            <a key={index} href={link.url} className="author-link">
              <i className={`fab fa-${link.icon}`}></i> {link.label}
            </a>
          ))}
        </div>
      </div>
      <a href={`/author/${name.toLowerCase().replace(/\s+/g, '')}`} className="btn follow-btn">关注作者</a>
    </div>
  );
};

export default AuthorCard; 