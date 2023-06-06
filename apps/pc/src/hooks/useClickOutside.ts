import { RefObject, useEffect } from 'react';

interface IClickOutsdieProps {
  startListen: boolean;
  targetElRef: RefObject<HTMLElement>;
  entryElRef: RefObject<HTMLElement>;
  cb: VoidFunction;
}
export const useClickOutside = ({
  startListen,
  targetElRef,
  entryElRef,
  cb,
}: IClickOutsdieProps): void => {
  useEffect(() => {
    if (startListen) {
      const onClickDocument = (e: MouseEvent): void => {
        const clickEl = e.target as Node;
        if (!targetElRef.current?.contains(clickEl) && !entryElRef.current?.contains(clickEl)) {
          cb();
        }
      };

      document.addEventListener('click', onClickDocument);

      return () => {
        document.removeEventListener('click', onClickDocument);
      };
    }
  }, [startListen]);
};
