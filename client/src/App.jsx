import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Stack from "./components/Stack"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import AllProjects from "./components/AllProjects"
import ProjectDetail from "./components/ProjectDetail"
import WorkExperience from "./components/WorkExperience"
import AdminLogin from "./components/admin/AdminLogin"
import AdminDashboard from "./components/admin/AdminDashboard"

const HomePage = ({ isDark, setIsDark, setIsModal }) => (
  <div
    className={`${isDark ? "dark" : ""} min-h-screen w-full overflow-y-auto overflow-x-hidden bg-white transition-colors duration-300 dark:bg-gray-900`}
  >
    <div className="bg-white transition-colors duration-300 dark:bg-gray-900">
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Hero setIsModal={setIsModal} />
      <Projects />
      <Stack />
      <WorkExperience />
      <Contact />
      <Footer />
    </div>
  </div>
)

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode")
    return saved ? JSON.parse(saved) : false
  })
  const [isModal, setIsModal] = useState(false)

  // Save dark mode preference to localStorage
  React.useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDark))
  }, [isDark])

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isDark={isDark}
              setIsDark={setIsDark}
              setIsModal={setIsModal}
            />
          }
        />
        <Route
          path="/projects"
          element={
            <div
              className={`${isDark ? "dark" : ""} min-h-screen w-full overflow-y-auto overflow-x-hidden bg-white transition-colors duration-300 dark:bg-gray-900`}
            >
              <div className="bg-white transition-colors duration-300 dark:bg-gray-900">
                <Navbar isDark={isDark} setIsDark={setIsDark} />
                <AllProjects />
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/project/:id"
          element={
            <div
              className={`${isDark ? "dark" : ""} min-h-screen w-full overflow-y-auto overflow-x-hidden bg-white transition-colors duration-300 dark:bg-gray-900`}
            >
              <div className="bg-white transition-colors duration-300 dark:bg-gray-900">
                <Navbar isDark={isDark} setIsDark={setIsDark} />
                <ProjectDetail />
                <Footer />
              </div>
            </div>
          }
        />
        <Route
          path="/admin"
          element={
            <div
              className={`${isDark ? "dark" : ""} min-h-screen w-full bg-white transition-colors duration-300 dark:bg-gray-900`}
            >
              <div className="bg-white transition-colors duration-300 dark:bg-gray-900">
                <Navbar isDark={isDark} setIsDark={setIsDark} />
                <AdminLogin />
              </div>
            </div>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <div
              className={`${isDark ? "dark" : ""} min-h-screen w-full bg-white transition-colors duration-300 dark:bg-gray-900`}
            >
              <div className="bg-white transition-colors duration-300 dark:bg-gray-900">
                <Navbar isDark={isDark} setIsDark={setIsDark} />
                <AdminDashboard />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
