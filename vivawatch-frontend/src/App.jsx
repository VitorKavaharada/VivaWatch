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
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Support from './components/Support/Support';
import Dashboard from './components/DashBoard/DashBoard';
import Payment from './components/Payment/Payment';

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
              <Pricing isLoggedIn={isLoggedIn} />
              <Support />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login onLoginStatusChange={handleLoginStatusChange} />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/protected" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="payment" element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;