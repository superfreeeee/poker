import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../models/user';
import { ERouteName } from '../routes/constants';
import { getPath } from '../routes/utils';

export const useLoginCheck = () => {
  const currentUser = useCurrentUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate(getPath(ERouteName.Login));
    }
  }, [currentUser, navigate]);
};
