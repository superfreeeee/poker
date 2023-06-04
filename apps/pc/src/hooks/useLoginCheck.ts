import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../models/user';
import { useValidateLoginService } from '../services/user';

export const useLoginCheck = () => {
  const currentUser = useCurrentUser();
  const validateLogion = useValidateLoginService();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let expired = false;

    if (!currentUser) {
      navigate('/login', { replace: true, state: { ...location } });
    } else {
      validateLogion(currentUser.id).catch(() => {
        if (expired) return;
        navigate('/login', { replace: true, state: { ...location } });
      });
    }

    return () => {
      expired = true;
    };
  }, [currentUser]);
};
