import { type FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Avatar, Button, Stack, TextField, Tooltip } from '@mui/material';

import { useStorage } from '@/hooks/api';
import { FileUploader } from '@/components/common';

type AccountFormProps = {
  id: string;
  email?: string;
  full_name: string;
  disabled: boolean;
  onSubmit: (data: any) => void;
};

export const AccountForm: FC<AccountFormProps> = ({ id, email, full_name, disabled, onSubmit }) => {
  const [avatar, setAvatar] = useState<Blob | null>(null);
  const { getImageUrlQuery } = useStorage();
  const { data: avatarUrl } = getImageUrlQuery('avatars', id);
  const { register, handleSubmit } = useForm<{ full_name: string }>();
  const handleCoverDrop = ([file]: File[]) => {
    setAvatar(file);
  };
  const submitFn: SubmitHandler<{ full_name: string }> = (data) => {
    onSubmit({ ...data, avatar });
  };
  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <Stack spacing={3}>
        <Tooltip title='Email address cannot be changed'>
          <TextField
            label='Email'
            disabled
            required
            value={email}
          />
        </Tooltip>
        <TextField
          label='Full name'
          {...register('full_name', { value: full_name })}
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
          disabled={disabled}
        >
          Submit Changes
        </Button>
      </Stack>
    </form>
  );
};
