import { useState, type FC, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { Button, Card, Stack, TextField, Typography } from '@mui/material';

import { RichTextEditor, RouterLink } from '@/components/common';
import { useRichTextEditor } from '@/hooks/use-rich-text';
import { FieldGroup } from './fieldgroup';
import { ImageUpload } from './image-upload';
import { deleteFile, uploadFile } from '@/api/file';

type PostFormProps =
  | {
      mode: 'create';
      post?: any;
      onSubmit: any;
      onDelete?: any;
    }
  | {
      mode: 'edit';
      post: any;
      onSubmit: any;
      onDelete: any;
    };

export const PostForm: FC<PostFormProps> = ({ mode, post, onSubmit, onDelete }) => {
  const [data, setData] = useState(post);
  const [cover, setCover] = useState<Blob | null>(null);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const { editor, getContent } = useRichTextEditor(post?.content || '');
  const to = mode === 'create' ? '/blog' : `/blog/${post.id}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    onSubmit({ ...data, content: getContent() });

    if (cover) {
      await uploadFile(`post-cover-${post.id}`, cover);
    }
    navigate(to);
  };

  const handleDelete = () => {
    if (mode === 'edit') {
      setPending(true);
      onDelete();
      deleteFile(`post-cover-${post.id}`);
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
              disabled={pending}
            >
              Delete
            </Button>
          )}
          <Button
            variant='contained'
            type='submit'
            disabled={pending}
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
            />
            <TextField
              fullWidth
              label='Short description'
              name='description'
              onChange={(e) => setData({ ...data, description: e.target.value })}
              value={data?.description || ''}
            />
            <TextField
              fullWidth
              label='Category'
              name='category'
              value={data?.category || ''}
              onChange={(e) => setData({ ...data, category: e.target.value })}
            />
          </Stack>
        </FieldGroup>
        <FieldGroup label='Post cover'>
          <Stack spacing={3}>
            <ImageUpload
              file={cover}
              setFile={setCover}
            />
          </Stack>
        </FieldGroup>
        <FieldGroup label='Content'>
          <RichTextEditor editor={editor} />
        </FieldGroup>
      </Stack>
    </form>
  );
};
