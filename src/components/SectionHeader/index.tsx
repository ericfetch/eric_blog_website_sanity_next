import Link from 'next/link';
import styles from './index.module.css';

interface SectionHeaderProps {
  title: string;
  linkText?: string;
  linkUrl?: string;
}

export default function SectionHeader({ title, linkText, linkUrl }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <h2>{title}</h2>
      <div className={styles.sectionLine}></div>
      {linkText && linkUrl && (
        <Link href={linkUrl} className={styles.viewAll}>
          {linkText} <i className="fas fa-arrow-right"></i>
        </Link>
      )}
    </div>
  );
} 