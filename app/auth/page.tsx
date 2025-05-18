'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './auth.module.css';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('mode') === 'login' ? 'login' : 'signup';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const router = useRouter();

  const handleGuestAccess = () => {
    router.push('/auth');
  };

  const handleLogin = () => {
    router.push('/auth');
  };

  const handleSignup = () => {
    router.push('/auth');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>quizonanything</h2>
          <p className={styles.cardDescription}>
            {activeTab === 'login'
              ? 'Sign in to your account'
              : 'Create a new account'}
          </p>
        </div>
        <div className={styles.cardContent}>
          <div className={styles.tabs}>
            <div className={styles.tabsList}>
              <button
                className={styles.tabsTrigger}
                data-state={activeTab === 'login' ? 'active' : 'inactive'}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={styles.tabsTrigger}
                data-state={activeTab === 'signup' ? 'active' : 'inactive'}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            <div
              className={styles.tabsContent}
              data-state={activeTab === 'login' ? 'active' : 'inactive'}
            >
              <div className={styles.formGroup}>
                <label htmlFor="email-login" className={styles.label}>
                  Email
                </label>
                <input
                  id="email-login"
                  type="email"
                  placeholder="your@email.com"
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password-login" className={styles.label}>
                  Password
                </label>
                <input
                  id="password-login"
                  type="password"
                  className={styles.input}
                />
              </div>
              <button
                className={styles.button}
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </button>
            </div>

            <div
              className={styles.tabsContent}
              data-state={activeTab === 'signup' ? 'active' : 'inactive'}
            >
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  id="name"
                  placeholder="Your name"
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email-signup" className={styles.label}>
                  Email
                </label>
                <input
                  id="email-signup"
                  type="email"
                  placeholder="your@email.com"
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password-signup" className={styles.label}>
                  Password
                </label>
                <input
                  id="password-signup"
                  type="password"
                  className={styles.input}
                />
              </div>
              <button
                className={styles.button}
                onClick={() => {
                  handleSignup();
                }}
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className={styles.divider}>
            <div className={styles.dividerLine}></div>
            <span className={styles.dividerText}>Or continue with</span>
          </div>

          <button className={styles.socialButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={styles.socialIcon}
            >
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </button>
        </div>
        <div className={styles.cardFooter}>
          <button className={styles.ghostButton} onClick={handleGuestAccess}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
