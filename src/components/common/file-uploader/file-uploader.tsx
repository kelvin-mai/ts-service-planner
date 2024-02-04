import type { FC } from 'react';
import type { DropzoneOptions, FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { Upload01, X } from '@untitled-ui/icons-react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';

import { FileIcon } from './file-icon';

export const bytesToSize = (bytes: number, decimals = 2): string => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export type File = FileWithPath;

type FileUploaderProps = DropzoneOptions & {
  caption?: string;
  files?: File[];
  onRemove?: (file: File) => void;
  onRemoveAll?: () => void;
  onUpload?: () => void;
};

export const FileUploader: FC<FileUploaderProps> = ({
  caption,
  files = [],
  onRemove,
  onRemoveAll,
  onUpload,
  ...props
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(props);

  const hasAnyFiles = files.length > 0;

  return (
    <div>
      <Box
        sx={{
          alignItems: 'center',
          border: 1,
          borderRadius: 1,
          borderStyle: 'dashed',
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          outline: 'none',
          p: 6,
          ...(isDragActive && {
            backgroundColor: 'action.active',
            opacity: 0.5,
          }),
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',
            opacity: 0.5,
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Stack
          alignItems='center'
          direction='row'
          spacing={2}
        >
          <Avatar
            sx={{
              height: 64,
              width: 64,
            }}
          >
            <SvgIcon>
              <Upload01 />
            </SvgIcon>
          </Avatar>
          <Stack spacing={1}>
            <Typography
              sx={{
                '& span': {
                  textDecoration: 'underline',
                },
              }}
              variant='h6'
            >
              <span>Click to upload</span> or drag and drop
            </Typography>
            {caption && (
              <Typography
                color='text.secondary'
                variant='body2'
              >
                {caption}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
      {hasAnyFiles && (
        <Box sx={{ mt: 2 }}>
          <List>
            {files.map((file) => {
              const extension = file.name.split('.').pop();

              return (
                <ListItem
                  key={file.path}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    '& + &': {
                      mt: 1,
                    },
                  }}
                >
                  <ListItemIcon>
                    <FileIcon extension={extension} />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'subtitle2' }}
                    secondary={bytesToSize(file.size)}
                  />
                  <Tooltip title='Remove'>
                    <IconButton
                      edge='end'
                      onClick={() => onRemove?.(file)}
                    >
                      <SvgIcon>
                        <X />
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
          <Stack
            alignItems='center'
            direction='row'
            justifyContent='flex-end'
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
              color='inherit'
              onClick={onRemoveAll}
              size='small'
              type='button'
            >
              Remove All
            </Button>
            <Button
              onClick={onUpload}
              size='small'
              type='button'
              variant='contained'
            >
              Upload
            </Button>
          </Stack>
        </Box>
      )}
    </div>
  );
};
