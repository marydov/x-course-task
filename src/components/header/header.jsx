import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../context/use-user';
import { GiShoppingCart } from 'react-icons/gi';
import avatar from '../../images/avatar.png';
import './header.scss';

const showUserName = (userName, unsubscribeHandler) => {
  return (
    <>
      <Link to={`/cart`}>
        <GiShoppingCart className="cart" />
      </Link>
      <button className="btn btn-light signout" onClick={unsubscribeHandler}>
        Sign-Out
      </button>
      <div className="user__photo">
        <img src={avatar} alt="User avatar" className="user__img" />
      </div>
      <h4>{userName}</h4>
    </>
  );
};

export default function Header() {
  const { userName, setUserName } = useContext(User);

  const navigate = useNavigate();

  const isSignInPage = window.location.hash === '';

  const unsubscribeHandler = () => {
    localStorage.removeItem('user');
    setUserName('');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__lside">
        <h4>MY STORE / Orishchuk Marina</h4>
      </div>
      <div className="header__rside">
        {userName === '' || isSignInPage
          ? ''
          : showUserName(userName, unsubscribeHandler)}
      </div>
    </header>
  );
}
