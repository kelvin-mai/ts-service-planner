import { useState, type FC, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, Skeleton, Stack, TextField, Typography } from '@mui/material';

import { FieldGroup, RichTextEditor, RouterLink } from '@/components/common';
import { useRichTextEditor } from '@/hooks/use-rich-text';
import { ImageUpload } from './image-upload';
import { Post } from '@/api/post';

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

export const PostForm: FC<PostFormProps> = ({ mode, post, disabled, onSubmit, onDelete }) => {
  const [data, setData] = useState<any>(post || {});
  const [cover, setCover] = useState<Blob | null>(null);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const { editor, getContent } = useRichTextEditor(post?.content || '');
  const to = mode === 'create' ? '/blog' : `/blog/${post?.id}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    onSubmit({ ...data, content: getContent(), cover });
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
    <form onSubmit={handleSubmit}>
      <Card
        elevation={16}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'space-between',
          mb: 8,
          mt: 6,
          px: 3,
          py: 2,
        }}
      >
        <Typography variant='subtitle1'>Hello, Admin</Typography>
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
      </Card>
      <Stack spacing={3}>
        <FieldGroup label='Basic details'>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label='Post title'
              name='title'
              onChange={(e) => setData({ ...data, title: e.target.value })}
              value={data?.title || ''}
              disabled={disabled}
            />
            <TextField
              fullWidth
              label='Short description'
              name='description'
              onChange={(e) => setData({ ...data, description: e.target.value })}
              value={data?.description || ''}
              disabled={disabled}
            />
            <TextField
              fullWidth
              label='Category'
              name='category'
              value={data?.category || ''}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              disabled={disabled}
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
