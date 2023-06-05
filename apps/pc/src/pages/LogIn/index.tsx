import React, { SyntheticEvent, useRef, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Input, Space } from 'antd';
import { useClickOutside } from '../../hooks/useClickOutside';
import { createLogger } from '../../common/commonLogger';
import { useLoggedUserList } from '../../models/loggedUser';
import { useInput } from '../../hooks/useInput';
import { IUser, useCurrentUserAtom } from '../../models/user';
import { useLoginService } from '../../services/user';
import styles from './index.module.scss';

const loginPageLogger = createLogger('pages/LogIn');

const LogIn = () => {
  const [currentUser, setCurrentUser] = useCurrentUserAtom();
  const [name, onNameChange] = useInput(currentUser?.name);

  const navigate = useNavigate();
  const { state } = useLocation();

  const [loggedListVisible, setLoggedListVisible] = useState<boolean>(false);
  const loggedListRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const { loggedUserList, addCurrentUser } = useLoggedUserList();

  useClickOutside({
    startListen: loggedListVisible,
    targetElRef: loggedListRef,
    entryElRef: inputRef,
    cb: () => {
      setLoggedListVisible(false);
    },
  });

  const loginService = useLoginService();

  const login = async (e: SyntheticEvent) => {
    if ((e.nativeEvent as KeyboardEvent)?.isComposing) return;
    loginPageLogger.log('login prev', state);
    const user = await loginService({ name });
    if (user) {
      setCurrentUser(user);
      addCurrentUser(user);
      state ? navigate(state, { replace: true }) : navigate('/home');
    }
  };

  const handleLoggedUserLogin = (user: IUser) => {
    loginPageLogger.log(name);
    setCurrentUser(user);
    addCurrentUser(user);
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <h1>Using @youxian/poker!</h1>
      <Space>
        <div ref={inputRef}>
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
              onFocus={() => {
                setLoggedListVisible(true);
              }}
            />
            <Button type="primary" onClick={login}>
              OK
            </Button>
          </Space.Compact>
        </div>
      </Space>
      {loggedListVisible ? (
        <div className={styles.loggedListWrap} ref={loggedListRef}>
          <div className={styles.title}> 最近登录过的用户</div>
          {loggedUserList?.map((loggedRecord) => (
            <div
              key={loggedRecord.id}
              className={styles.loggedRecord}
              onClick={() =>
                handleLoggedUserLogin({ name: loggedRecord.name, id: loggedRecord.id })
              }
            >
              <UserOutlined className={styles.icon}></UserOutlined>
              <div className={styles.name}>{loggedRecord.name}</div>
              <div className={classNames(styles.extraInfo, styles.id)}>id: {loggedRecord.id}</div>
              <div className={classNames(styles.extraInfo, styles.time)}>
                last login time: {loggedRecord.lastLoggedTime}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default LogIn;
