'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useHomePageData } from '../../hooks/useHomePageData';

export default function GlobalLayout({ children }) {
  const { data } = useHomePageData();

  return (
    <>
      <Navbar data={data?.navigation} />
      {children}
      <Footer data={data?.footer} />
    </>
  );
}
