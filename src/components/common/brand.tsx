import { Typography } from '@mui/material';

export const Brand = ({ ...props }) => {
  return (
    <Typography
      color='text.primary'
      variant='h6'
      sx={{
        '& span': {
          color: 'primary.main',
        },
      }}
    >
      Service <span>Planner</span>
    </Typography>
  );
};
