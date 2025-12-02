import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { usePlants } from '../hooks/usePlants';

export default function NavLinks({ isOpen }) {
  const { user } = usePlants();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const links = [
    { to: '/', label: 'Home' },
    { to: '/garden', label: 'My Garden' },
    { to: '/daily-tasks', label: 'Daily Tasks' },
    { to: '/focus-timer', label: 'Focus Timer' },
    { to: '/plant-store', label: 'Plant Store' },
  ];

  return (
    <ul className={`list-none m-0 ${isOpen ? 'flex' : 'hidden'} lg:flex fixed lg:static top-[60px] lg:top-0 left-0 w-full lg:w-auto bg-nav-bg lg:bg-transparent flex-col lg:flex-row p-4 sm:p-5 lg:p-0 shadow-md lg:shadow-none z-[999] gap-2 sm:gap-2.5 lg:gap-4 xl:gap-6`}>
      {links.map(link => (
        <li key={link.to}>
          <Link to={link.to} className="text-nav-text no-underline font-medium text-sm sm:text-base hover:underline block py-1 lg:py-0">
            {link.label}
          </Link>
        </li>
      ))}
      {user ? (
        <li>
          <button 
            onClick={handleLogout}
            className="text-nav-text no-underline font-medium text-sm sm:text-base hover:underline block py-1 lg:py-0"
          >
            Logout
          </button>
        </li>
      ) : (
        <li>
          <Link to="/login" className="text-nav-text no-underline font-medium text-sm sm:text-base hover:underline block py-1 lg:py-0">
            Login
          </Link>
        </li>
      )}
    </ul>
  );
}