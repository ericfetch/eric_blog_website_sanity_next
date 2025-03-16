import styles from './index.module.css';

interface PageTitleProps {
  title: string;
  description: string;
}

export default function PageTitle({ title, description }: PageTitleProps) {
  return (
    <section className={styles.pageTitle}>
      <div className="container">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
} 