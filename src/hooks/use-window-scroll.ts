import { useEffect } from 'react';
import { debounce } from '@/utils/timing';

interface Config {
  handler: () => void;
  delay?: number;
}

export const useWindowScroll = (config: Config): void => {
  useEffect(() => {
    const { handler, delay } = config;

    const debounced = debounce(handler, delay);

    window.addEventListener('scroll', debounced);

    return () => {
      window.removeEventListener('scroll', debounced);
    };
  }, [config]);
};
