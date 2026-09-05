import { About } from './components/About'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Providers } from './components/Providers'
import { Toolkit } from './components/Toolkit'
import { Work } from './components/Work'

export default function App() {
  return (
    <Providers>
      <div className="grain">
        <Nav />
        <main id="main">
          <Hero />
          <Marquee />
          <Work />
          <Toolkit />
          <Experience />
          <About />
        </main>
        <Footer />
      </div>
    </Providers>
  )
}
