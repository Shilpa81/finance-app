'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Take Control of Your Financial Future
        </h1>
        <p className="hero-subtitle">
          Manage, track, and grow your wealth with our intuitive finance management platform. 
          Make smarter financial decisions today.
        </p>
        <div className="hero-buttons">
          <Link href="/dashboard" className="btn btn-primary">
            Get Started
          </Link>
          <Link href="#features" className="btn btn-secondary">
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
