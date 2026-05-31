'use client';

import { useEffect, useRef, useState } from 'react';

export default function ValueSection() {
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="value-section" aria-label="The Value We Bring">
      <div className="value-background">
        <div className="value-bubble value-bubble-1"></div>
        <div className="value-bubble value-bubble-2"></div>
        <div className="value-bubble value-bubble-3"></div>
      </div>
     <div className="value-row">
      <div className={`value-text ${isVisible ? 'animate-in' : ''}`} ref={textRef}>
        <div className="value-header">
          <h2 className="value-title">The Value We Bring</h2>
          <p className="value-description">
            Your goals become our priority. We provide clear, personalized financial guidance that helps you protect your family, grow your wealth, and confidently prepare for every stage of life. With trust and care at the center, we help turn today’s decisions into tomorrow’s security.
          </p>
        </div>
      </div>
      <div className="value-image">
        <img src="/images/financeAll.jpeg" alt="Description" />
        <svg className="value-border-animation" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect x="0" y="0" width="100" height="100" fill="none" stroke="url(#borderGradient)" strokeWidth="1.5" />
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 0, 0, 1)" />
              <stop offset="50%" stopColor="rgba(192, 192, 192, 1)" />
              <stop offset="100%" stopColor="rgba(0, 0, 0, 1)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
     </div>
    </section>
  );
}
