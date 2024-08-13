import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />  {/* This is where the nested routes will be rendered */}
      <Footer />
    </>
  );
};

export default MainLayout;
