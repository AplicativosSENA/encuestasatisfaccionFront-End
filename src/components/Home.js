import React from 'react';
import { Banner } from './Homepage/Banner';
import Footer from './Homepage/Footer';
import Navbar from './Homepage/NavBar';
import '../assets/css/Home.css'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner id="banner" />
      <Footer id="footer" />
    </div>
  );
};

export default Home;
