
import React, { useState, useEffect } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CounterAnimation: React.FC<CounterProps> = ({
  end, 
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = '',
  className = ''
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        startCounting();
      }, delay);
      
      return () => clearTimeout(delayTimer);
    } else {
      startCounting();
    }
    
    function startCounting() {
      let startTime: number;
      let animationFrame: number;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = Math.floor(progress * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, delay]);

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};
