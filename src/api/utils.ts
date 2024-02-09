import type { QueryKey } from '@tanstack/react-query';

import { apiClient } from './index';

export const withInvalidate = (
  queryKey: QueryKey,
  f?: (data: any, variables: any, context: unknown) => unknown
) => {
  apiClient.invalidateQueries({ queryKey });
  if (f) {
    return f;
  }
};
