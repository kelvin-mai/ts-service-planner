import { Calendar, HomeSmile, Lock01, Upload04, User03 } from '@untitled-ui/icons-react';
import { NavSectionProps } from './nav-section';

export const sections: NavSectionProps[] = [
  {
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: <HomeSmile /> },
      { title: 'Account', path: '/account', icon: <Lock01 /> },
      { title: 'People', path: '/people', icon: <User03 /> },
      { title: 'Calendar', path: '/calendar', icon: <Calendar /> },
      { title: 'File Manager', path: '/files', icon: <Upload04 /> },
    ],
  },
];
