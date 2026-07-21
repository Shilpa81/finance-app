'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/transactions?search=${encodeURIComponent(q)}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          💰 FinanceApp
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the site..."
            aria-label="Search"
          />
        </form>

        <button 
          className="hamburger" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link href="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>
              Our Vision
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/transactions" className="nav-link" onClick={() => setIsOpen(false)}>
             Products 
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/settings" className="nav-link" onClick={() => setIsOpen(false)}>
              Solutions 
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
