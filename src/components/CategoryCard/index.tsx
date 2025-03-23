import Link from 'next/link';
import styles from './index.module.css';
import { 
  Home, Star, Favorite, Person, Settings, Message,
  Notifications, CalendarToday, Book, MusicNote, Movie,
  Photo, Cloud, GetApp, Publish, Search, ArrowForward
} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

interface CategoryCardProps {
  title: string;
  description: string;
  count: number;
  slug: string;
  bulletPoints?: string[];
}

function getRandomVisualElements() {
  // 预设一组MUI图标
  const icons = [
    Home, Star, Favorite, Person, Settings, Message, 
    Notifications, CalendarToday, Book, MusicNote, Movie,
    Photo, Cloud, GetApp, Publish, Search
  ];
  
  // 预设图标颜色（明亮、醒目的颜色）
  const iconColors = [
    '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE',
    '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE',
    '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40'
  ];
  
  // 预设背景颜色（柔和、淡色调）
  const bgColors = [
    '#FFEBEE', '#FCE4EC', '#F3E5F5', '#EDE7F6', '#E8EAF6',
    '#E3F2FD', '#E1F5FE', '#E0F7FA', '#E0F2F1', '#E8F5E9',
    '#F1F8E9', '#F9FBE7', '#FFFDE7', '#FFF8E1', '#FFF3E0'
  ];
  
  // 随机选择
  const randomIconIndex = Math.floor(Math.random() * icons.length);
  const randomIconColor = iconColors[Math.floor(Math.random() * iconColors.length)];
  const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
  
  return {
    IconComponent: icons[randomIconIndex],
    iconColor: randomIconColor,
    bgColor: randomBgColor
  };
}

export default function CategoryCard({ 
  title, 
  description, 
  count, 
  slug,
  bulletPoints = []
}: CategoryCardProps) {
  const visualElements = getRandomVisualElements();
  const { IconComponent } = visualElements;
  
  return (
    <div className={styles.categoryCard}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper} style={{ backgroundColor: visualElements.bgColor }}>
          <IconComponent style={{ color: visualElements.iconColor }} />
        </div>
        <div className={styles.headerContent}>
          <h2 className={styles.categoryTitle}>{title}</h2>
          <span className={styles.categoryCount}>{count}篇文章</span>
        </div>
      </div>
      
      <div className={styles.cardBody}>
        <p className={styles.categoryDescription}>{description}</p>
        
        {bulletPoints.length > 0 && (
          <ul className={styles.bulletList}>
            {bulletPoints.map((point, index) => (
              <li key={index} className={styles.bulletItem}>
                <span className={styles.bulletDot}></span>
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className={styles.cardFooter}>
        <Link href={`/category/${slug}`} className={styles.viewMoreLink}>
          查看专题 <ArrowForward fontSize="small" />
        </Link>
      </div>
    </div>
  );
} 