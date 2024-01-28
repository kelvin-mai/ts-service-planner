import type { FC } from 'react';
import { FaceSmile, Attachment01, Image01, Plus } from '@untitled-ui/icons-react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  OutlinedInput,
  Stack,
  SvgIcon,
  useMediaQuery,
  type Theme,
} from '@mui/material';

export const PostCommentAdd: FC = (props) => {
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

  return (
    <div {...props}>
      <Stack
        alignItems='flex-start'
        direction='row'
        spacing={2}
      >
        <Avatar
          src='/assets/avatars/avatar-anika-visser.png'
          sx={{
            height: 40,
            width: 40,
          }}
        >
          A K
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <OutlinedInput
            fullWidth
            multiline
            placeholder='Add a comment'
            rows={3}
          />
          <Stack
            alignItems='center'
            direction='row'
            spacing={3}
            justifyContent='space-between'
            sx={{ mt: 3 }}
          >
            <Stack
              alignItems='center'
              direction='row'
              spacing={1}
            >
              {!smUp && (
                <IconButton>
                  <SvgIcon>
                    <Plus />
                  </SvgIcon>
                </IconButton>
              )}
              {smUp && (
                <>
                  <IconButton>
                    <SvgIcon>
                      <Image01 />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <Attachment01 />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <FaceSmile />
                    </SvgIcon>
                  </IconButton>
                </>
              )}
            </Stack>
            <div>
              <Button variant='contained'>Send</Button>
            </div>
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};
