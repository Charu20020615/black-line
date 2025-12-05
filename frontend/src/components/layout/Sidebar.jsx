import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded ${isActive ? 'bg-black text-white' : 'hover:bg-gray-100'}`;
  return (
    <aside className="w-60 border-r h-full p-4">
      <nav className="flex flex-col gap-1">
        <NavLink to="/dashboard" className={linkClass}>Home</NavLink>
        <NavLink to="/dashboard/reports" className={linkClass}>Reports</NavLink>
        <NavLink to="/staff" className={linkClass}>Staff</NavLink>
        <NavLink to="/staff/add" className={linkClass}>Add Staff</NavLink>
      </nav>
    </aside>
  );
}


