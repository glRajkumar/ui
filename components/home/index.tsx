import Philosophy from "./philosophy";
import Install from "./install";
import Footer from "./footer";
import Header from "./header";

function Home() {
  return (
    <main className="home">
      <Header />
      <Philosophy />
      <Install />
      <Footer />
    </main>
  )
}

export default Home
