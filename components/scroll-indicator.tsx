import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  styles: any;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ styles }) => {
  return (
    <div className={styles.scrollIndicator}>
      <p>Explore Public Quiz Rooms</p>
      <ChevronDown className={styles.scrollArrow} />
    </div>
  );
};

export default ScrollIndicator; 