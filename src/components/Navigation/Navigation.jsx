import { NavLink } from 'react-router-dom';

import css from './Navigation.module.css';

const Navigation = () => (
  <nav className={css.nav}>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/contacts">Contacts</NavLink>
  </nav>
);

export default Navigation;
