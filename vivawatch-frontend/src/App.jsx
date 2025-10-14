import { useState } from 'react';
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
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginStatusChange = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLoginStatusChange={handleLoginStatusChange} /> 
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Features />
              <Timeline />
              <CustomerReviews />
              <Cards />
              <Pricing />
              <Footer />
            </>
          }
        />
        <Route
          path="/auth"
          element={<Auth onClose={() => {}} onLoginStatusChange={handleLoginStatusChange} />}
        />
        <Route path="/protected" element={<PrivateRoute />}>
          {/* Espaço para as rotas que vão ser protegidas*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;