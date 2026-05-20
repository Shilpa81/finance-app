'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          💰 FinanceApp
        </Link>

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
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/transactions" className="nav-link" onClick={() => setIsOpen(false)}>
              Transactions
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/settings" className="nav-link" onClick={() => setIsOpen(false)}>
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
