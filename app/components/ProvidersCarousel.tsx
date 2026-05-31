'use client';

import { useRef } from 'react';

const providers = [
  {
    name: 'Stripe',
    description: 'Fast payments and seamless billing.',
    accent: '#6C63FF',
  },
  {
    name: 'Plaid',
    description: 'Secure banking data connectivity.',
    accent: '#00A6FF',
  },
  {
    name: 'Apex',
    description: 'Real-time wealth analytics and trends.',
    accent: '#FF8C42',
  },
  {
    name: 'Nimbus',
    description: 'Smart invoice automation.',
    accent: '#4ADE80',
  },
  {
    name: 'Arbor',
    description: 'Advanced savings optimization.',
    accent: '#D946EF',
  },
];

export default function ProvidersCarousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;
    const delta = direction === 'left' ? -width * 0.65 : width * 0.65;
    carouselRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section className="providers-section" aria-label="Trusted providers carousel">
      <div className="providers-header">
        <div>
          <p className="providers-label">Trusted by modern finance teams</p>
          <h2 className="providers-title">Top providers powering your money workflows</h2>
        </div>
        <div className="carousel-controls">
          <button type="button" className="carousel-button" onClick={() => scroll('left')} aria-label="Scroll left">
            ←
          </button>
          <button type="button" className="carousel-button" onClick={() => scroll('right')} aria-label="Scroll right">
            →
          </button>
        </div>
      </div>

      <div className="providers-carousel" ref={carouselRef}>
        {providers.map((provider) => (
          <article key={provider.name} className="provider-card" style={{ borderColor: provider.accent }}>
            <div className="provider-logo" style={{ background: provider.accent }}>
              {provider.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="provider-content">
              <h3>{provider.name}</h3>
              <p>{provider.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
