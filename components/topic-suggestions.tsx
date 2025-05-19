import React from 'react';
import { Styles } from './types';

interface TopicSuggestionsProps {
  topics: string[];
  onTopicSelect: (topic: string) => void;
  styles: Styles;
}

const TopicSuggestions: React.FC<TopicSuggestionsProps> = ({
  topics,
  onTopicSelect,
  styles
}) => {
  return (
    <>
      <p className={styles.topicsHeading}>Or choose from popular topics:</p>
      <div className={styles.topicsGrid}>
        {topics.map(topic => (
          <button
            key={topic}
            onClick={() => onTopicSelect(topic)}
            className={styles.topicButton}
          >
            {topic}
          </button>
        ))}
      </div>
    </>
  );
};

export default TopicSuggestions;
