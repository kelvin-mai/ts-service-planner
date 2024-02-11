import type { QueryKey } from '@tanstack/react-query';

import { apiClient } from './index';

export const queryDefaults = {
  staleTime: Infinity,
};

export const withInvalidate = (
  queryKey: QueryKey,
  f?: (data: any, variables: any, context: unknown) => unknown
) => {
  return (...args: [any, any, unknown]) => {
    apiClient.invalidateQueries({ queryKey });
    if (f) {
      f(...args);
    }
  };
};

export const withReset = (
  queryKey: QueryKey,
  f?: (data: any, variables: any, context: unknown) => unknown
) => {
  return (...args: [any, any, unknown]) => {
    apiClient.resetQueries({ queryKey });
    if (f) {
      return f(...args);
    }
  };
};
