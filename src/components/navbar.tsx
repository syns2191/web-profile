'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-[var(--color-primary-medium)] shadow-md py-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="#" className="text-2xl font-bold text-[var(--color-primary-accent)] dark:text-white">sutralian.dev</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link href="#hero" className="hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">Home</Link></li>
          <li><Link href="#about" className="hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">About</Link></li>
          <li><Link href="#projects" className="hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">Projects</Link></li>
          <li><Link href="#skills" className="hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">Skills</Link></li>
          <li><Link href="#contact" className="hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">Contact</Link></li>
          {/* <li><Link href="/activity" className="hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">Activity</Link></li> */}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[var(--color-primary-dark)] dark:text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[var(--color-primary-medium)] shadow-md py-4">
            <ul className="flex flex-col items-center space-y-4">
              <li><Link href="#hero" onClick={() => setIsMenuOpen(false)} className="block py-2 text-[var(--color-primary-dark)] dark:text-white hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link href="#about" onClick={() => setIsMenuOpen(false)} className="block py-2 text-[var(--color-primary-dark)] dark:text-white hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">About</Link></li>
              <li><Link href="#projects" onClick={() => setIsMenuOpen(false)} className="block py-2 text-[var(--color-primary-dark)] dark:text-white hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">Projects</Link></li>
              <li><Link href="#skills" onClick={() => setIsMenuOpen(false)} className="block py-2 text-[var(--color-primary-dark)] dark:text-white hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">Skills</Link></li>
              <li><Link href="#contact" onClick={() => setIsMenuOpen(false)} className="block py-2 text-[var(--color-primary-dark)] dark:text-white hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">Contact</Link></li>
              {/* <li><Link href="/activity" onClick={() => setIsMenuOpen(false)} className="block py-2 text-[var(--color-primary-dark)] dark:text-white hover:text-[var(--color-primary-accent)] dark:hover:text-white transition-colors duration-300">Activity</Link></li> */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
