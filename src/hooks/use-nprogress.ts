import nProgress from 'nprogress';
import { useEffect, useState } from 'react';

import { useMounted } from './use-mounted';
import { useRouterState } from '@tanstack/react-router';

export const useNprogress = () => {
  const mounted = useMounted();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
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
