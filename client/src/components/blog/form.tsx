import { useState, type FC, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  Card,
  CardContent,
  Unstable_Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { RichTextEditor, RouterLink } from '@/components/common';
import { useRichTextEditor } from '@/hooks/use-rich-text';
import { FileUploader } from '../common/file-uploader/file-uploader';

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

const fileToBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const PostForm: FC<PostFormProps> = ({ mode, post, onSubmit, onDelete }) => {
  const [data, setData] = useState(post);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const { editor, getContent } = useRichTextEditor(post?.content || '');
  const to = mode === 'create' ? '/blog' : `/blog/${post.id}`;

  const [cover, setCover] = useState<string | null>('/assets/covers/abstract-1-4x3-large.png');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    onSubmit({ ...data, cover, content: getContent() });
    navigate(to);
  };

  const handleDelete = () => {
    if (mode === 'edit') {
      setPending(true);
      onDelete();
      navigate(`/blog`);
    }
  };

  const handleCoverDrop = async ([file]: File[]) => {
    const data = (await fileToBase64(file)) as string;
    setCover(data);
  };

  const handleCoverRemove = async () => {
    setCover(null);
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
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={4}
              >
                <Typography variant='h6'>Basic details</Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
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
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={4}
              >
                <Typography variant='h6'>Post cover</Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <Stack spacing={3}>
                  {cover ? (
                    <Box
                      sx={{
                        backgroundImage: `url(${cover})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        borderRadius: 1,
                        height: 230,
                        mt: 3,
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        border: 1,
                        borderRadius: 1,
                        borderStyle: 'dashed',
                        borderColor: 'divider',
                        height: 230,
                        mt: 3,
                        p: 3,
                      }}
                    >
                      <Typography
                        align='center'
                        color='text.secondary'
                        variant='h6'
                      >
                        Select a cover image
                      </Typography>
                      <Typography
                        align='center'
                        color='text.secondary'
                        sx={{ mt: 1 }}
                        variant='subtitle1'
                      >
                        Image used for the blog post cover and also for Open Graph meta
                      </Typography>
                    </Box>
                  )}
                  <div>
                    <Button
                      color='inherit'
                      disabled={!cover}
                      onClick={handleCoverRemove}
                    >
                      Remove photo
                    </Button>
                  </div>
                  <FileUploader
                    accept={{ 'image/*': [] }}
                    maxFiles={1}
                    onDrop={handleCoverDrop}
                    caption='(SVG, JPG, PNG, or gif maximum 900x400)'
                  />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={4}
              >
                <Typography variant='h6'>Content</Typography>
              </Grid>
              <Grid
                xs={12}
                md={8}
              >
                <RichTextEditor editor={editor} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </form>
  );
};
