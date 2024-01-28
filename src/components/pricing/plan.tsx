import type { FC, ReactNode } from 'react';
import type { Theme, SxProps } from '@mui/material';
import { Box, Button, Card, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { Check } from '@untitled-ui/icons-react';

type PricingPlanProps = {
  cta: string;
  currency: string;
  description: string;
  features: string[];
  icon: ReactNode;
  name: string;
  popular?: boolean;
  price: string;
  sx?: SxProps<Theme>;
};

export const PricingPlan: FC<PricingPlanProps> = ({
  cta,
  currency,
  description,
  features,
  icon,
  name,
  popular,
  price,
  sx,
  ...props
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
      {...props}
    >
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            height: 52,
            width: 52,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='h4'>
            {currency}
            {price}
          </Typography>
          <Typography
            color='text.secondary'
            sx={{
              alignSelf: 'flex-end',
              ml: 1,
            }}
            variant='subtitle2'
          >
            /mo
          </Typography>
        </Box>
        <Typography
          sx={{ mt: 2 }}
          variant='h6'
        >
          {name}
        </Typography>
        <Typography
          color='text.secondary'
          sx={{ mt: 2 }}
          variant='body2'
        >
          {description}
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          p: 3,
        }}
      >
        <Stack
          spacing={2}
          sx={{ flexGrow: 1 }}
        >
          {features.map((feature) => (
            <Stack
              alignItems='center'
              direction='row'
              spacing={1}
              key={feature}
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <SvgIcon color='success'>
                <Check />
              </SvgIcon>
              <Typography
                sx={{ fontWeight: 500 }}
                variant='body2'
              >
                {feature}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 6,
          }}
        >
          <Button
            fullWidth
            variant={popular ? 'contained' : 'outlined'}
          >
            {cta}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};
