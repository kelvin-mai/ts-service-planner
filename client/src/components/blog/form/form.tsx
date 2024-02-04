import { useState, type FC } from 'react';
import { redirect, useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Button, Skeleton, Stack, TextField } from '@mui/material';

import { FieldGroup, RichTextEditor, RouterLink } from '@/components/common';
import { useAuth, useRichTextEditor } from '@/hooks';
import { Post } from '@/api/post';
import { ImageUpload } from './image-upload';
import { BlogActions } from '../actions';

type PostFormProps = {
  post?: Post;
  onSubmit: any;
  disabled?: boolean;
} & (
  | {
      mode: 'create';
      onDelete?: any;
    }
  | {
      mode: 'edit';
      onDelete: any;
    }
);

type PostFieldValues = {
  title: string;
  description: string;
  category: string;
};

export const PostForm: FC<PostFormProps> = ({ mode, post, disabled, onSubmit, onDelete }) => {
  const { register, handleSubmit } = useForm<PostFieldValues>();
  const { user } = useAuth();
  if (!user) {
    redirect('/blog');
  }
  const [cover, setCover] = useState<Blob | null>(null);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const { editor, getContent } = useRichTextEditor(post?.content || '');
  const to = mode === 'create' ? '/blog' : `/blog/${post?.id}`;

  const submitFn: SubmitHandler<PostFieldValues> = async (data) => {
    setPending(true);
    onSubmit({ ...data, cover, author: user?.id, content: getContent() });
    navigate(to);
  };

  const handleDelete = () => {
    if (mode === 'edit') {
      setPending(true);
      onDelete();
      navigate(`/blog`);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <BlogActions>
        <Stack
          alignItems='center'
          direction='row'
          spacing={2}
        >
          <Button
            component={RouterLink}
            color='inherit'
            href={to}
            disabled={pending}
          >
            Cancel
          </Button>
          {mode === 'edit' && (
            <Button
              variant='contained'
              color='secondary'
              onClick={handleDelete}
              disabled={disabled || pending}
            >
              Delete
            </Button>
          )}
          <Button
            variant='contained'
            type='submit'
            disabled={disabled || pending}
          >
            Publish
          </Button>
        </Stack>
      </BlogActions>
      <Stack spacing={3}>
        <FieldGroup label='Basic details'>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label='Post title'
              disabled={disabled}
              {...register('title', { value: post?.title })}
            />
            <TextField
              fullWidth
              label='Short description'
              disabled={disabled}
              {...register('description', { value: post?.description })}
            />
            <TextField
              fullWidth
              label='Category'
              disabled={disabled}
              {...register('category', { value: post?.category })}
            />
          </Stack>
        </FieldGroup>
        <FieldGroup label='Post cover'>
          <Stack spacing={3}>
            {disabled ? (
              <Skeleton height={200} />
            ) : (
              <ImageUpload
                file={cover}
                setFile={setCover}
              />
            )}
          </Stack>
        </FieldGroup>
        <FieldGroup label='Content'>
          {disabled ? <Skeleton height={200} /> : <RichTextEditor editor={editor} />}
        </FieldGroup>
      </Stack>
    </form>
  );
};
