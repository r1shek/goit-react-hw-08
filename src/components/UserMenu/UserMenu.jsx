import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operation';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.menu}>
      <span>Welcome, {user.name}</span>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default UserMenu;
