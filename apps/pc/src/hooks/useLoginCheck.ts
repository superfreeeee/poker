import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../models/user';
import { useValidateLoginService } from '../services/user';

export const useLoginCheck = () => {
  const currentUser = useCurrentUser();
  const validateLogion = useValidateLoginService();
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      validateLogion(currentUser.id).catch(() => {
        navigate('/login');
      });
    }
  }, [currentUser, navigate]);
};
