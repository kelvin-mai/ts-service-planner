import { useState, type Dispatch, type SetStateAction, type FC, useEffect } from 'react';
import { Box, Button, Skeleton, Typography } from '@mui/material';

import { FileUploader } from '@/components/common';

type ImagePreviewProps = {
  file: Blob;
};

const ImagePreview: FC<ImagePreviewProps> = ({ file }) => {
  const [src, setSrc] = useState<string>();

  const fileToBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    fileToBase64(file).then((s) => setSrc(s));
  }, [file]);

  return (
    <>
      {src ? (
        <Box
          component='img'
          src={src}
          crossOrigin='anonymous'
          alt='cover'
          sx={{
            width: '100%',
            objectPosition: 'center',
            objectFit: 'cover',
            height: '100%',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        />
      ) : (
        <Skeleton
          component='div'
          sx={{
            height: 230,
            mt: 3,
            p: 3,
          }}
        />
      )}
    </>
  );
};

type ImageUploadProps = {
  file: Blob | null;
  setFile: Dispatch<SetStateAction<Blob | null>>;
};

export const ImageUpload: FC<ImageUploadProps> = ({ file, setFile }) => {
  const handleCoverDrop = async ([file]: File[]) => {
    setFile(file);
  };

  return (
    <>
      {file ? (
        <>
          <ImagePreview file={file} />
          <Button
            variant='contained'
            color='inherit'
            onClick={() => setFile(null)}
          >
            Remove photo
          </Button>
        </>
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
      <FileUploader
        accept={{ 'image/*': [] }}
        maxFiles={1}
        onDrop={handleCoverDrop}
        caption='(SVG, JPG, PNG, or gif maximum 900x400)'
      />
    </>
  );
};
