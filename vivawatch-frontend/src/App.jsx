import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Cards from './components/Cards/Cards';
import Pricing from './components/Pricing/Pricing';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import CustomerReviews from './components/CustomerReviews/CustomerReviews';
import Timeline from './components/TimeLine/TimeLine';
import Auth from './components/Auth/Auth';

function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route 
            path='/'
            element={
              <>
                <Hero />
                <About/>
                <Features />
                <Timeline />
                <CustomerReviews/>
                <Cards/>
                <Pricing/>
                <Footer/>
              </>
            }
          />
         <Route path="/auth" element={<Auth onClose={() => {}} />} />  {/* implementar depois para rotas protegidas */}
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;