import { useEffect, useState } from 'react';
import { json } from 'react-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  Avatar,
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks';
import { FieldGroup, FileUploader, Seo } from '@/components/common';
import { type ProfileDTO, getProfile, updateProfile, getProfileImage } from '@/api/profile';
import { deleteAccount } from '@/api/auth';
import { apiClient } from '@/api';

export const Component = () => {
  const auth = useAuth();
  const [avatar, setAvatar] = useState<Blob | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { data, isPending, isError } = useQuery<ProfileDTO>({
    queryKey: ['profile'],
    queryFn: () => getProfile(auth.user.id),
  });
  const { mutate } = useMutation({
    mutationFn: (data: ProfileDTO) => updateProfile(auth?.user.id, data),
    onSuccess: () => apiClient.invalidateQueries({ queryKey: ['profile'] }),
  });
  if (isError) {
    throw json({}, { status: 500 });
  }
  useEffect(() => {
    getProfileImage(auth?.user.id).then((img) => setAvatarUrl(img));
  }, [auth]);
  const { register, handleSubmit } = useForm();
  const handleUpdateProfile: SubmitHandler<any> = (data) => {
    mutate({ ...data, avatar });
  };
  const handleCoverDrop = ([file]: File[]) => {
    setAvatar(file);
  };
  return (
    <>
      <Seo title='Account' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack
            spacing={3}
            sx={{ mb: 3 }}
          >
            <Typography variant='h4'>Account</Typography>
          </Stack>
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
              <FieldGroup label='Basic details'>
                <Stack spacing={3}>
                  <Tooltip title='Email address cannot be changed'>
                    <TextField
                      label='Email'
                      disabled
                      required
                      value={auth.user.email}
                    />
                  </Tooltip>
                  {data ? (
                    <TextField
                      label='Full name'
                      {...register('full_name', { value: data.full_name })}
                    />
                  ) : (
                    <Skeleton />
                  )}
                  <Stack
                    alignItems='center'
                    direction='row'
                    spacing={2}
                  >
                    <Avatar
                      src={avatarUrl || ''}
                      // '/assets/avatars/avatar-anika-visser.png'
                      sx={{ height: 100, width: 100 }}
                    />
                    <FileUploader
                      accept={{ 'image/*': [] }}
                      maxFiles={1}
                      onDrop={handleCoverDrop}
                      caption='(SVG, JPG, or PNG maximum 400x400)'
                    />
                  </Stack>
                  <Button
                    type='submit'
                    disabled={isPending}
                  >
                    Submit Changes
                  </Button>
                </Stack>
              </FieldGroup>
            </form>
            <FieldGroup label='Delete Account'>
              <Stack
                alignItems='flex-start'
                spacing={3}
              >
                <Typography variant='subtitle1'>
                  Delete your account and all of your source data. This is irreversible.
                </Typography>
                <Button
                  color='error'
                  variant='outlined'
                  disabled={isPending}
                  onClick={() => deleteAccount(auth.user.id)}
                >
                  Delete account
                </Button>
              </Stack>
            </FieldGroup>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
