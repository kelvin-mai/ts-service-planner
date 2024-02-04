import toast from 'react-hot-toast';

import { getBaseUrl } from '@/utils/url';
import { supabase, supabaseAdmin } from './index';

export type AuthCredentials = {
  email: string;
  password: string;
};

export const signIn = async (credentials: AuthCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    toast.error(error.message);
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
    toast.error(error.message);
  }
  return data;
};

export const logout = supabase.auth.signOut;

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getBaseUrl()}/update-password`,
  });
  if (error) {
    toast.error(error.message);
  }
  return data;
};

export const updatePassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });
  if (error) {
    toast.error(error.message);
  }
  return data;
};

export const deleteAccount = async (id: string) => {
  const { data, error } = await supabaseAdmin.deleteUser(id);
  if (error) {
    toast.error(error.message);
  }
  return data;
};
