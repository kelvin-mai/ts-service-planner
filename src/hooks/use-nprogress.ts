import nProgress from 'nprogress';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useMounted } from './use-mounted';

export const useNprogress = () => {
  const mounted = useMounted();
  const pathname = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      nProgress.start();
      setVisible(true);
    }
    if (visible) {
      nProgress.done();
      setVisible(false);
    }
    if (!visible && mounted()) {
      setVisible(false);
      nProgress.done();
    }

    return () => {
      nProgress.done();
    };
  }, [pathname, mounted]);
};
