import { FC, PropsWithChildren } from 'react';

import { Card, CardContent, Unstable_Grid2 as Grid, Typography } from '@mui/material';

type FieldGroupProps = PropsWithChildren & {
  label: string;
};

export const FieldGroup: FC<FieldGroupProps> = ({ label, children }) => {
  return (
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
            <Typography variant='h6'>{label}</Typography>
          </Grid>
          <Grid
            xs={12}
            md={8}
          >
            {children}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
