import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import BestSeller from './components/BestSeller'
import WhyChooseUs from './components/WhyChooseUs'
import ThoughtfullyCrafted from './components/ThoughtfullyCrafted'
import FestiveGifting from './components/FestiveGifting'
import Banner from './components/Banner'
import Feedback from './components/Feedback'
import Footer from './components/Footer'


function App() {

  return (
    <>
      <Navbar />
      <HeroSection />
      <BestSeller />
      {/* <WhyChooseUs /> */}
      <ThoughtfullyCrafted />
      <FestiveGifting />
      <Banner />
      <Feedback />
      <Footer />
    </>
  )
}

export default App