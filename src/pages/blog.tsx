import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Divider,
  Unstable_Grid2 as Grid,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { ArrowLeft, ArrowRight } from '@untitled-ui/icons-react';

import { RouterLink, Seo } from '@/components/common';
import { PostCard, PostNewsletter } from '@/components/blog';
import { posts } from '@/api/blog';

export const BlogPage = () => {
  return (
    <>
      <Seo title='Blog: Post List' />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Stack spacing={1}>
            <Typography variant='h3'>Blog</Typography>
            <Breadcrumbs
              separator={
                <Box
                  sx={{ backgroundColor: 'neutral.500', borderRadius: '50%', height: 4, width: 4 }}
                />
              }
            >
              <Link
                color='text.primary'
                component={RouterLink}
                href='/'
                variant='subtitle2'
              >
                Dashboard
              </Link>
              <Link
                color='text.primary'
                component={RouterLink}
                href='/'
                variant='subtitle2'
              >
                Blog
              </Link>
              <Typography
                color='text.secondary'
                variant='subtitle2'
              >
                List
              </Typography>
            </Breadcrumbs>
          </Stack>
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
            <Button
              component={RouterLink}
              href='/blog/new'
              variant='contained'
            >
              New Post
            </Button>
          </Card>
          <Typography variant='h4'>Recent Articles</Typography>
          <Typography
            color='text.secondary'
            sx={{ mt: 2 }}
            variant='body1'
          >
            Discover the latest news, tips and user research insights from Acme.
          </Typography>
          <Typography
            color='text.secondary'
            variant='body1'
          >
            You will learn about web infrastructure, design systems and devops APIs best practices.
          </Typography>
          <Divider sx={{ my: 4 }} />
          <Grid
            container
            spacing={4}
          >
            {posts.map((post) => (
              <Grid
                key={post.title}
                xs={12}
                md={6}
              >
                <PostCard
                  authorAvatar={post.author.avatar}
                  authorName={post.author.name}
                  category={post.category}
                  cover={post.cover}
                  publishedAt={post.publishedAt}
                  readTime={post.readTime}
                  shortDescription={post.shortDescription}
                  title={post.title}
                  sx={{ height: '100%' }}
                />
              </Grid>
            ))}
          </Grid>
          <Stack
            alignItems='center'
            direction='row'
            justifyContent='center'
            spacing={1}
            sx={{
              mt: 4,
              mb: 8,
            }}
          >
            <Button
              disabled
              startIcon={
                <SvgIcon>
                  <ArrowLeft />
                </SvgIcon>
              }
            >
              Newer
            </Button>
            <Button
              endIcon={
                <SvgIcon>
                  <ArrowRight />
                </SvgIcon>
              }
            >
              Older posts
            </Button>
          </Stack>
          <Box sx={{ mt: 8 }}>
            <PostNewsletter />
          </Box>
        </Container>
      </Box>
    </>
  );
};
