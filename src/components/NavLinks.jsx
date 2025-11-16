import { Link } from 'react-router-dom';

export default function NavLinks({ isOpen }) {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/daily-tasks', label: 'Daily Tasks' },
    { to: '/focus-timer', label: 'Focus Timer' },
    { to: '/plant-store', label: 'Plant Store' },
  ];

  return (
    <ul className={`list-none m-0 gap-6 ${isOpen ? 'flex' : 'hidden'} lg:flex fixed lg:static top-[60px] left-0 w-full lg:w-auto bg-nav-bg lg:bg-transparent flex-col lg:flex-row p-5 lg:p-0 shadow-md lg:shadow-none z-[999] gap-2.5 lg:gap-6`}>
      {links.map(link => (
        <li key={link.to}>
          <Link to={link.to} className="text-nav-text no-underline font-medium hover:underline">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}