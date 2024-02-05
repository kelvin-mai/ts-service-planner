import { json, redirect } from 'react-router';
import toast from 'react-hot-toast';
import { Box, Container, Skeleton, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks';
import { FieldGroup, Seo } from '@/components/common';
import { AccountForm } from '@/components/account-form';
import { type ProfileDTO, updateProfile } from '@/api/profile';
import { apiClient } from '@/api';

export const Component = () => {
  const { user, profile, isPending } = useAuth();
  if (!user) {
    return redirect('/auth/login');
  }
  const updateMutation = useMutation({
    mutationFn: (data: ProfileDTO) => updateProfile(profile.id, data),
    onSuccess: () => {
      apiClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Successfully updated account');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
  if (updateMutation.isError) {
    throw json({}, { status: 500 });
  }
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
            <FieldGroup label='Basic details'>
              {isPending ? (
                <Skeleton height={400} />
              ) : (
                <AccountForm
                  id={profile.id}
                  email={user.email}
                  full_name={profile.full_name}
                  onSubmit={updateMutation.mutate}
                  disabled={updateMutation.isPending}
                />
              )}
            </FieldGroup>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
