import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createLogger } from '../../common/commonLogger';
import { useInput } from '../../hooks/useInput';
import { useCurrentUserAtom } from '../../models/user';
import { loginService } from '../../services/user';

const loginPageLogger = createLogger('pages/LogIn');

const LogIn = () => {
  const [currentUser, setCurrentUser] = useCurrentUserAtom();
  const [name, onNameChange] = useInput(currentUser?.name);

  const navigate = useNavigate();

  const login = async () => {
    loginPageLogger.log(`[pages/Login] login: name = ${name}`);
    const user = await loginService(name);
    if (user) {
      setCurrentUser(user);
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Input your name</h1>
      <div>
        <input type="text" value={name} onChange={onNameChange} />
        <button onClick={login}>OK</button>
      </div>
    </div>
  );
};

export default LogIn;
