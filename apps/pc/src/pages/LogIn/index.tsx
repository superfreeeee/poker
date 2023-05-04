import React, { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Space } from 'antd';
import { createLogger } from '../../common/commonLogger';
import { useInput } from '../../hooks/useInput';
import { useCurrentUserAtom } from '../../models/user';
import { loginService } from '../../services/user';
import styles from './index.module.scss';

const loginPageLogger = createLogger('pages/LogIn');

const LogIn = () => {
  const [currentUser, setCurrentUser] = useCurrentUserAtom();
  const [name, onNameChange] = useInput(currentUser?.name);

  const navigate = useNavigate();

  const login = async (e: SyntheticEvent) => {
    if ((e.nativeEvent as KeyboardEvent)?.isComposing) return;

    loginPageLogger.log(`login: name = ${name}`);
    const user = await loginService(name);
    if (user) {
      setCurrentUser(user);
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Input your name</h1>
      <Space>
        <Space.Compact size="large" style={{ width: 350 }}>
          <Input
            placeholder="Input your name"
            allowClear
            showCount
            maxLength={30}
            defaultValue={name}
            value={name}
            onChange={onNameChange}
            onPressEnter={login}
          />
          <Button type="primary" onClick={login}>
            OK
          </Button>
        </Space.Compact>
      </Space>
    </div>
  );
};

export default LogIn;
