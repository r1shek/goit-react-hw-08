import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './AppBar.module.css';

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? css.activeLink : css.link)}
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/contacts"
            className={({ isActive }) => (isActive ? css.activeLink : css.link)}
          >
            Contacts
          </NavLink>
        )}
      </nav>
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
