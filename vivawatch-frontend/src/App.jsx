import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Cards from './components/Cards/Cards';
import Pricing from './components/Pricing/Pricing';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import CustomerReviews from './components/CustomerReviews/CustomerReviews';
import Timeline from './components/TimeLine/TimeLine';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About/>
      <Features />
      <Timeline />
      <CustomerReviews/>
      <Cards/>
      <Pricing/>
      <Footer/>
    </>
  );
}

export default App;