import React from 'react';
import { Styles } from './types';

interface QuizMode {
  id: string;
  label: string;
}

interface DifficultyLevel {
  id: string;
  label: string;
}

interface QuizControlsProps {
  quizMode: string;
  difficulty: string;
  dropdownOpen: string | null;
  styles: Styles;
  onModeSelect: (mode: string) => void;
  onDifficultySelect: (level: string) => void;
  onToggleDropdown: (dropdown: string) => void;
  onStartQuiz: () => void;
  quizModes: QuizMode[];
  difficultyLevels: DifficultyLevel[];
}

const QuizControls: React.FC<QuizControlsProps> = ({
  quizMode,
  difficulty,
  dropdownOpen,
  styles,
  onModeSelect,
  onDifficultySelect,
  onToggleDropdown,
  onStartQuiz,
  quizModes,
  difficultyLevels
}) => {
  const getCurrentModeLabel = () => {
    return quizModes.find(mode => mode.id === quizMode)?.label || 'Trivia';
  };

  const getCurrentDifficultyLabel = () => {
    return (
      difficultyLevels.find(level => level.id === difficulty)?.label || 'Medium'
    );
  };

  return (
    <div className={styles.controlsWrapper}>
      <div
        className={`${styles.dropdownContainer} ${dropdownOpen === 'mode' ? styles.dropdownOpen : ''}`}
      >
        <button
          className={styles.dropdownButton}
          onClick={() => onToggleDropdown('mode')}
        >
          <span>{getCurrentModeLabel()}</span>
          <span className={styles.dropdownIcon}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        <div className={styles.dropdownMenu}>
          {quizModes.map(mode => (
            <button
              key={mode.id}
              className={`${styles.dropdownItem} ${quizMode === mode.id ? styles.dropdownItemActive : ''}`}
              onClick={() => onModeSelect(mode.id)}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`${styles.dropdownContainer} ${dropdownOpen === 'difficulty' ? styles.dropdownOpen : ''}`}
      >
        <button
          className={styles.dropdownButton}
          onClick={() => onToggleDropdown('difficulty')}
        >
          <span>{getCurrentDifficultyLabel()}</span>
          <span className={styles.dropdownIcon}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
        <div className={styles.dropdownMenu}>
          {difficultyLevels.map(level => (
            <button
              key={level.id}
              className={`${styles.dropdownItem} ${difficulty === level.id ? styles.dropdownItemActive : ''}`}
              onClick={() => onDifficultySelect(level.id)}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Public/Private Toggle commented out
      <div className={styles.toggleContainer}>
        <label className={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={onTogglePublic}
            className={styles.toggleInput}
          />
          <span className={styles.toggleSlider}></span>
          <span className={styles.toggleText}>
            {isPublic ? 'Public' : 'Private'}
          </span>
        </label>
      </div>
      */}

      <button onClick={onStartQuiz} className={styles.startButton}>
        Create Quiz
      </button>
    </div>
  );
};

export default QuizControls;
