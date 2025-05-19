'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './username-modal.module.css';

interface UsernameModalProps {
  onComplete: () => void;
}

export default function UsernameModal({ onComplete }: UsernameModalProps) {
  const [username, setUsername] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already has an ID and username
    const userId = localStorage.getItem('quizmaster_user_id');
    const storedUsername = localStorage.getItem('quizmaster_username');

    if (!userId || !storedUsername) {
      setIsVisible(true);
    } else {
      // User already has credentials
      onComplete();
    }
  }, [onComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim()) {
      // Generate a UUID for the user if they don't have one
      if (!localStorage.getItem('quizmaster_user_id')) {
        localStorage.setItem('quizmaster_user_id', uuidv4());
      }

      // Store the username
      localStorage.setItem('quizmaster_username', username.trim());

      // Close the modal
      setIsVisible(false);
      onComplete();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Welcome to quizonanything</h2>
        <p className={styles.description}>
          Please enter a username to continue
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Your username"
            className={styles.input}
            autoFocus
          />
          <button
            type="submit"
            className={styles.button}
            disabled={!username.trim()}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
