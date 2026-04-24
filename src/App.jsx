import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SplashScreen from './components/SplashScreen'

export default function App() {
  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem('kjb-splash') === 'true'
  )

  const handleSplashDone = () => {
    sessionStorage.setItem('kjb-splash', 'true')
    setSplashDone(true)
  }

  return (
    <div className="bg-[#080815] text-slate-100 min-h-screen overflow-x-hidden">
      {!splashDone && <SplashScreen onEnter={handleSplashDone} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
