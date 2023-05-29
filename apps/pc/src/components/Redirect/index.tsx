import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface IRedirectProps {
  path: string;
  beforeRedirect?: (path: string) => void;
}

const Redirect: FC<IRedirectProps> = ({ path, beforeRedirect }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    beforeRedirect?.(location.pathname);
    navigate(path);
  }, [beforeRedirect, location.pathname, navigate, path]);

  return <></>;
};

export default Redirect;
