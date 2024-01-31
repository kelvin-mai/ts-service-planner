import type { Dispatch, SetStateAction, FC } from 'react';
import { Box, Button, Typography } from '@mui/material';

import { FileUploader } from '@/components/common';

type ImageUploadProps = {
  file: Blob | null;
  setFile: Dispatch<SetStateAction<Blob | null>>;
};

export const ImageUpload: FC<ImageUploadProps> = ({ file, setFile }) => {
  const fileToBase64 = (file: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCoverDrop = async ([file]: File[]) => {
    setFile(file);
  };

  return (
    <>
      {file ? (
        <Box
          sx={{
            backgroundImage: `url(${file})`,
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
          disabled={!file}
          onClick={() => setFile(null)}
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
    </>
  );
};
