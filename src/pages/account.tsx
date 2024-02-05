import { useState } from 'react';
import { json, redirect } from 'react-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { useAuth, useImageUrl } from '@/hooks';
import { FieldGroup, FileUploader, Seo } from '@/components/common';
import { type ProfileDTO, updateProfile } from '@/api/profile';
import { apiClient } from '@/api';

export const Component = () => {
  const { user, profile, ...auth } = useAuth();
  console.log({ user, profile, ...auth });
  if (auth.isPending) {
    return <></>;
  }
  const [avatar, setAvatar] = useState<Blob | null>(null);
  const avatarUrl = useImageUrl('avatars', profile.id);
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: ProfileDTO) => updateProfile(profile.id, data),
    onSuccess: () => apiClient.invalidateQueries({ queryKey: ['profile'] }),
  });
  if (isError) {
    throw json({}, { status: 500 });
  }
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
                      value={user.email}
                    />
                  </Tooltip>
                  <TextField
                    label='Full name'
                    {...register('full_name', { value: profile.full_name })}
                  />
                  <Stack
                    alignItems='center'
                    direction='row'
                    spacing={2}
                  >
                    <Avatar
                      src={avatarUrl || ''}
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
          </Stack>
        </Container>
      </Box>
    </>
  );
};
