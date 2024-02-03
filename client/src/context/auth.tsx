import { type FC, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';

import { supabase } from '@/api';

export const AuthContext = createContext<Session | null>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
};
