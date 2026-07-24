'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Take Control of Your Financial Future</h1>
        <p className="hero-subtitle">
          Your future deserves more than guesswork. We provide personalized financial solutions designed to help protect your family, grow your wealth, and prepare you for every stage of life. From retirement and estate planning to health coverage and long-term care strategies, our experienced professionals are here to guide you with clarity, confidence, and care.
        </p>
        <div className="hero-buttons">
          <Link href="/dashboard" className="btn btn-primary">
            Get Started
          </Link>
          <Link href="#product-section" className="btn btn-secondary">
            Learn More
          </Link>
        </div>
      </div>
      <div className="hero-background">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
      </div>
    </section>
  );
}
