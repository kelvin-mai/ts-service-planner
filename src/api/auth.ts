import { getBaseUrl } from '@/utils/url';
import { supabase } from './index';

export type AuthCredentials = {
  email: string;
  password: string;
};

export const signIn = async (credentials: AuthCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    throw error;
  }
  return data;
};

export const signUp = async (credentials: AuthCredentials) => {
  const { data, error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      emailRedirectTo: `${getBaseUrl()}/account`,
    },
  });
  if (error) {
    throw error;
  }
  return data;
};

export const signOut = () => supabase.auth.signOut();

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getBaseUrl()}/auth/update-password`,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const updatePassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  if (error) {
    throw error;
  }
  return data;
};
