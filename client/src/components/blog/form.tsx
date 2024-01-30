import { useState, type FC, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import {
  Button,
  Card,
  CardContent,
  Unstable_Grid2 as Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { RouterLink } from '@/components/common';

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
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const to = mode === 'create' ? '/blog' : `/blog/${post.id}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    onSubmit(data);
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
      </Stack>
    </form>
  );
};
