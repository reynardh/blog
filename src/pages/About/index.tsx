import React from 'react';

import Layout from '@/components/Layout';

import { Title } from '../titleConfig';
import s from './index.scss';

const About: React.FC = () => {
  return <Layout title={Title.About}>About</Layout>;
};

export default About;
