import React, { useContext, useEffect } from 'react';
import { UserContext } from '../utils/UtilContext';
import Hero from '../sections/Hero';
import Feature from '../sections/Feature';
import About from '../sections/About';
import Workouts from '../sections/Workouts';
import Footer from '../sections/Footer';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className='home'>
      <Hero />
      <Feature />
      <About />
      <Workouts />
      <Footer />
    </div>
  )
}

export default Home
