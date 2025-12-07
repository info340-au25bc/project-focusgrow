import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { Menu, X } from 'lucide-react';
import { usePlants } from '../hooks/usePlants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = usePlants();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
      setIsOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-nav-bg shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={user ? "/" : "/"} className="flex items-center gap-2" onClick={handleNavClick}>
            <h1 className="text-xl sm:text-2xl lg:text-[1.6rem] font-bold text-nav-text pl-8 sm:pl-10 lg:pl-2.5">
                FocusGrow
            </h1>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/garden" className="text-nav-text hover:text-accent font-medium transition-colors">
                  Garden
                </Link>
                <Link to="/daily-tasks" className="text-nav-text hover:text-accent font-medium transition-colors">
                  Daily Tasks
                </Link>
                <Link to="/focus-timer" className="text-nav-text hover:text-accent font-medium transition-colors">
                  Focus Timer
                </Link>
                <Link to="/plant-store" className="text-nav-text hover:text-accent font-medium transition-colors">
                  Plant Store
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-nav-text hover:text-accent font-medium transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-nav-text"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-30 top-16"
            onClick={handleNavClick}
          />
          <div className="md:hidden bg-nav-bg border-t border-gray-200 relative z-40">
            {user ? (
              <>
                <Link 
                  to="/" 
                  onClick={handleNavClick}
                  className="block px-4 py-3 text-nav-text hover:bg-gray-100 font-medium"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/garden" 
                  onClick={handleNavClick}
                  className="block px-4 py-3 text-nav-text hover:bg-gray-100 font-medium"
                >
                  Garden
                </Link>
                <Link 
                  to="/daily-tasks"
                  onClick={handleNavClick}
                  className="block px-4 py-3 text-nav-text hover:bg-gray-100 font-medium"
                >
                  Daily Tasks
                </Link>
                <Link 
                  to="/focus-timer"
                  onClick={handleNavClick}
                  className="block px-4 py-3 text-nav-text hover:bg-gray-100 font-medium"
                >
                  Focus Timer
                </Link>
                <Link 
                  to="/plant-store"
                  onClick={handleNavClick}
                  className="block px-4 py-3 text-nav-text hover:bg-gray-100 font-medium"
                >
                  Plant Store
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 bg-accent text-white hover:opacity-90 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  onClick={handleNavClick}
                  className="block px-4 py-3 text-nav-text hover:bg-gray-100 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  onClick={handleNavClick}
                  className="block px-4 py-3 text-nav-text hover:bg-gray-100 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
}