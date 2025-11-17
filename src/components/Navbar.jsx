import { useState } from 'react';
import NavLinks from './NavLinks';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-nav-bg flex justify-between items-center px-4 sm:px-6 md:px-10 py-2.5 z-[1000] shadow-nav">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden absolute left-2 sm:left-3 text-xl sm:text-2xl text-nav-text p-2 sm:p-2.5"
        aria-label="open menu"
      >
        ☰
      </button>

      <h1 className="text-xl sm:text-2xl lg:text-[1.6rem] font-bold text-nav-text pl-8 sm:pl-10 lg:pl-2.5">
        FocusGrow
      </h1>

      <NavLinks isOpen={isMenuOpen} />
    </nav>
  );
}