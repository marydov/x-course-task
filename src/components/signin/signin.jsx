import { useNavigate } from 'react-router-dom';
import './signin.scss';
import avatar from '../../images/avatar.png';

export default function Signin(props) {
  const navigate = useNavigate();

  const changeUserNameHandler = () => {
    navigate('/books');
    props.setUserName(props.userName);
  };

  return (
    <>
      <div className="signin__container">
        <img src={avatar} alt="User avatar" className="avatar__img" />
        <h4>Username</h4>
        <div className="user__form">
          <input
            type="text"
            className="name"
            placeholder="type Username"
            onChange={(e) => props.setUserName(e.target.value)}
          />
          <input
            type="button"
            className="submit"
            defaultValue="Sign-in"
            disabled={
              props.userName.length < 4 ||
              props.userName.length > 16 ||
              props.userName === '' ||
              props.userName === 'Username' ||
              props.userName.includes(' ')
            }
            onClick={changeUserNameHandler}
          />
        </div>
      </div>
    </>
  );
}
