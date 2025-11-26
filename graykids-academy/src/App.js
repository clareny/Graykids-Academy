import React from 'react';
import CTA from './components/CTA';
import Courses from './components/Courses';
import FAQ from './components/FAQ';
import FeaturedCourse from './components/FeaturedCourse';
import Footer from './components/Footer';
import Founder from './components/Founder';
import Header from './components/Header';
import Hero from './components/Hero';
import Membership from './components/Membership';
import Testimonials from './components/Testimonials';
import { useAnimations } from './hooks/useAnimations';
import './styles/Normalize.css';
import './styles/estilos.css';

function App() {
  useAnimations();

  return (
    <div className="App">
      <Header />
      <Hero />
      <FeaturedCourse />
      <Courses />
      <Membership />
      <Testimonials />
      <CTA />
      <Founder />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
