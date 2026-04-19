import BeforeAfter from './before-after'
import Philosophy from './philosophy'
import Install from './install'
import Footer from './footer'
import Header from './header'

function Home() {
  return (
    <main className="home">
      <Header />
      <Philosophy />
      <BeforeAfter />
      <Install />
      <Footer />
    </main>
  )
}

export default Home
