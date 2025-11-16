import { useState } from 'react';
import NavLinks from './NavLinks';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-nav-bg flex justify-between items-center px-10 py-2.5 z-[1000] shadow-nav">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden absolute left-3 text-2xl text-nav-text p-2.5"
        aria-label="open menu"
      >
        ☰
      </button>

      <h1 className="text-2xl lg:text-[1.6rem] font-bold text-nav-text pl-2.5">
        FocusGrow
      </h1>

      <NavLinks isOpen={isMenuOpen} />
    </nav>
  );
}