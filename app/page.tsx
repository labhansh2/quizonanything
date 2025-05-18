import Link from 'next/link';
import styles from './page.module.css';

// BASE PAGE FOR NOW
// TO DO : Add a good landing page later
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>quizonanything</h1>
          <p className={styles.subtitle}>
            Test your knowledge on any topic with our adaptive quizzes
          </p>
        </div>

        <div className={styles.buttonSection}>
          <Link href="/auth">
            <button className={styles.button}>Get Started</button>
          </Link>

          <div className={styles.loginText}>
            <p>
              Already using quizonanything?{' '}
              <Link href="/auth?mode=login" className={styles.loginLink}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
