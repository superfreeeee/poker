import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../models/user';

export const useLoginCheck = () => {
  const currentUser = useCurrentUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
};
