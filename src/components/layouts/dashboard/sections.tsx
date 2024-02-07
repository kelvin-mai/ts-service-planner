import { HomeSmile, Lock01 } from '@untitled-ui/icons-react';
import { NavSectionProps } from './nav-section';

export const sections: NavSectionProps[] = [
  {
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: <HomeSmile /> },
      { title: 'Account', path: '/account', icon: <Lock01 /> },
    ],
  },
];
