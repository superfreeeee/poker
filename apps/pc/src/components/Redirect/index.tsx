import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = ({ path }: { path: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, [navigate, path]);

  return <></>;
};

export default Redirect;
