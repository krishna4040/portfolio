import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Stack from './components/Stack'
import Contact from './components/Contact'
import Modal from './components/Modal'
import Footer from './components/Footer'
import AllProjects from './components/AllProjects'
import WorkExperience from './components/WorkExperience'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'

const HomePage = ({ isDark, setIsDark, setIsModal }) => (
  <div className={`${isDark ? 'dark' : ''} w-full h-screen overflow-x-hidden overflow-y-auto`}>
    <Navbar isDark={isDark} setIsDark={setIsDark} />
    <Hero setIsModal={setIsModal} />
    <Projects />
    <Stack/>
    <WorkExperience/>
    <Contact/> 
    <Footer/>
  </div>
);

const App = () => {
  const [isDark,setIsDark] = useState(false);
  const [isModal,setIsModal] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage isDark={isDark} setIsDark={setIsDark} setIsModal={setIsModal} />} />
        <Route path="/projects" element={
          <div className={`${isDark ? 'dark' : ''} w-full min-h-screen overflow-x-hidden overflow-y-auto`}>
            <Navbar isDark={isDark} setIsDark={setIsDark} />
            <AllProjects />
            <Footer/>
          </div>
        } />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App