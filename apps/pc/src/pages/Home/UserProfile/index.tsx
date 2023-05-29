import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Popover, Tooltip } from 'antd';
import { CaretDownOutlined, CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { useCurrentUser } from '../../../models/user';
import styles from './index.module.scss';

const COPY_DELAY = 1500;

const UserProfile = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const [isCopied, setIsCopied] = useState(false);

  const copyUserId = () => {
    if (!currentUser || isCopied) {
      return;
    }

    navigator.clipboard.writeText(currentUser?.id);

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, COPY_DELAY);
  };

  const switchUser = () => {
    navigate('/login');
  };

  return (
    <Popover
      content={
        <div>
          <div className={styles.profileDetail}>
            <span>User Id: {currentUser?.id}</span>
            <Tooltip open={isCopied} title="Copied!">
              <Button icon={isCopied ? <CheckOutlined /> : <CopyOutlined />} onClick={copyUserId} />
            </Tooltip>
          </div>
          <Button
            type="primary"
            danger
            style={{ width: '100%', marginTop: 12 }}
            onClick={switchUser}
          >
            Switch User
          </Button>
        </div>
      }
      placement="bottomRight"
      destroyTooltipOnHide
      onOpenChange={(visible) => {
        if (!visible) {
          setIsCopied(false);
        }
      }}
    >
      <div className={styles.profile}>
        Current User: {currentUser?.name}
        <CaretDownOutlined />
      </div>
    </Popover>
  );
};

export default UserProfile;
