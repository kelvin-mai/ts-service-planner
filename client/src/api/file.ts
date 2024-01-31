import { getApiUrl } from '@/utils/url';

const apiUrl = getApiUrl();

export const uploadFile = async (filename: string, file: Blob) => {
  const body = new FormData();
  body.append('file', file);
  const res = await fetch(`${apiUrl}/file/${filename}`, {
    method: 'POST',
    body,
  });
  return await res.json();
};

export const deleteFile = async (filename: string) => {
  const res = await fetch(`${apiUrl}/file/${filename}`, {
    method: 'DELETE',
  });
  return await res.json();
};
