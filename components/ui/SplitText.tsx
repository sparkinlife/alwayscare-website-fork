import React from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;   // base delay in ms before first letter starts
  stagger?: number; // delay between each letter in ms
}

const SplitText: React.FC<SplitTextProps> = ({
  children,
  className = '',
  delay = 0,
  stagger = 30,
}) => {
  return (
    <span className={className} aria-label={children}>
      {children.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block animate-letter-reveal"
          style={{
            animationDelay: `${delay + i * stagger}ms`,
          }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
