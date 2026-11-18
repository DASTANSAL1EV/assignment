import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <NavLink to="/" end>Task Manager</NavLink>
      <NavLink to="/about">О приложении</NavLink>
    </header>
  );
}