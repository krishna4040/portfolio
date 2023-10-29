import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Contact from './components/Contact'
import Modal from './components/Modal'
import Footer from './components/Footer'

const App = () => {

  const [isDark,setIsDark] = useState(false);
  const [isModal,setIsModal] = useState(false);

  return (
    <div className={`${isDark ? 'dark' : ''} w-full h-screen overflow-x-hidden overflow-y-auto`}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Hero setIsModal={setIsModal} />
      <Projects />
      <Stack/>
      <Contact/> 
      <Footer/>
    </div>
  )
}

export default App