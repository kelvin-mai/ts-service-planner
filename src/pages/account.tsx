import { json } from 'react-router';
import toast from 'react-hot-toast';
import { Box, Container, Skeleton, Stack, Typography } from '@mui/material';

import { useAuth } from '@/hooks';
import { type BreadcrumbLink, Breadcrumbs, FieldGroup, Seo } from '@/components/common';
import { AccountForm } from '@/components/account-form';
import { AuthGuard } from '@/components/auth';
import { useProfileApi } from '@/api/hooks';

export const Component = () => {
  const { user, profile, isPending } = useAuth();
  const { getUpdateMutation } = useProfileApi();
  const updateMutation = getUpdateMutation(user.id, {
    onSuccess: () => toast.success('Successfully updated account'),
    onError: () => toast.error('Something went wrong'),
  });
  if (updateMutation.isError) {
    throw json({}, { status: 500 });
  }
  const breadcrumbs: BreadcrumbLink[] = [{ href: '/', title: 'Home' }];
  return (
    <AuthGuard
      authorized
      authorizeId={profile?.id}
    >
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
            <Typography variant='h2'>Account</Typography>
            <Breadcrumbs
              links={breadcrumbs}
              current='Account'
            />
          </Stack>
          <Stack spacing={4}>
            <FieldGroup label='Basic details'>
              {isPending ? (
                <Skeleton height={400} />
              ) : (
                <AccountForm
                  id={profile.id}
                  email={user?.email}
                  full_name={profile.full_name || ''}
                  onSubmit={updateMutation.mutate}
                  disabled={updateMutation.isPending}
                />
              )}
            </FieldGroup>
          </Stack>
        </Container>
      </Box>
    </AuthGuard>
  );
};
