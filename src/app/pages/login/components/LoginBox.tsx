import React from 'react';
import './LoginBox.less';
import { ReactComponent as Logo } from '@assets/svg/vietjet_logo.svg';
import { useHistory } from 'react-router-dom';

const LoginBox: React.FC = () => {
  const history = useHistory();

  const handleLogin = (): void => {
    history.push('/admin');
  };

  return (
    <div className="ui tight grid middle aligned sub-container">
      <div className="login-box column">
        <div className="upper-part">
          <div className="logo">
            <div className="image-wrapper">
              <Logo className="logo-img" />
            </div>
            <h1 className="title-text align-center">Asset Management</h1>
          </div>
          <div className="greeting-box">
            <h1 className="title-text greeting">Good morning</h1>
            <p className="greeting">
              Please sign in using your company email and password
            </p>
          </div>
          <input type="text" className="login-textfield" placeholder="Email" />
          <input
            type="password"
            className="login-textfield"
            placeholder="Password"
          />
        </div>
        <button onClick={handleLogin} type="submit" className="login-button">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default LoginBox;
