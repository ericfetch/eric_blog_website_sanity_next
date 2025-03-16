import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.css';

interface ProjectCardProps {
  thumbnail: string;
  badges: string[];
  title: string;
  description: string;
  difficulty: string;
  tutorialCount: number;
  slug: string;
}

export default function ProjectCard({
  thumbnail,
  badges,
  title,
  description,
  difficulty,
  tutorialCount,
  slug
}: ProjectCardProps) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectThumbnail}>
        <Image 
          src={thumbnail} 
          alt={`${title} 缩略图`} 
          width={500} 
          height={300}
          layout="responsive"
        />
        <div className={styles.projectBadges}>
          {badges.map((badge, index) => (
            <span key={index} className={styles.projectBadge}>{badge}</span>
          ))}
        </div>
      </div>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDescription}>{description}</p>
        <div className={styles.projectMeta}>
          <span className={styles.projectDifficulty}>
            <i className="fas fa-signal"></i> {difficulty}
          </span>
          <span className={styles.projectDuration}>
            <i className="far fa-clock"></i> {tutorialCount}篇教程
          </span>
        </div>
        <Link href={`/project/${slug}`} className={styles.projectLink}>
          开始学习 <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
} 