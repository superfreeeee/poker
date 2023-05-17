import { useEffect } from 'react';

export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    if (!title) return;

    const originTitle = document.title;
    document.title = title;
    return () => {
      document.title = originTitle;
    };
  }, [title]);
};
