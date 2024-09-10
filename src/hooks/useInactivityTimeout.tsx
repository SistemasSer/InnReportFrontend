// src/hooks/useInactivityTimeout.ts

import { useEffect } from 'react';

const useInactivityTimeout = (timeout: number, onInactive: () => void) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(onInactive, timeout);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);

    timer = setTimeout(onInactive, timeout);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, [timeout, onInactive]);
};

export default useInactivityTimeout;
