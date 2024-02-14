import { json } from 'react-router';
import toast from 'react-hot-toast';
import { Skeleton, Stack } from '@mui/material';

import { useAuth } from '@/hooks';
import { useProfile } from '@/hooks/api';
import { type BreadcrumbLink, FieldGroup, Heading, Main, Seo } from '@/components/common';
import { AccountForm } from '@/components/account-form';
import { AuthGuard } from '@/components/auth';

export const Component = () => {
  const { user, profile, isPending } = useAuth();
  const { getUpdateMutation } = useProfile();
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
      <Main>
        <Heading
          breadcrumbs={breadcrumbs}
          title='Account'
        />
        <Stack
          spacing={4}
          sx={{ mt: 4 }}
        >
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
      </Main>
    </AuthGuard>
  );
};
