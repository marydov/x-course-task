import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../context/use-user';
import { GiShoppingCart } from 'react-icons/gi';
import './styles.scss';

export default function Header(props) {
  const userName = useContext(User);

  const navigate = useNavigate();

  const unsubscribeHandler = () => {
    navigate('/');
    props.setUserName('Username');
  };

  return (
    <header className="header">
      <div className="header__lside">
        <h4>MY STORE / Orishchuk Marina</h4>
      </div>
      <div className="header__rside">
        <Link to={`/cart`}>
          <GiShoppingCart className="cart" />
        </Link>

        <button className="btn btn-light signout" onClick={unsubscribeHandler}>
          Sign-Out
        </button>
        <div className="user__photo"></div>
        <h4>{userName}</h4>
      </div>
    </header>
  );
}
