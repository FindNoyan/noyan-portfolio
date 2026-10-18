import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

export default function App() {
  return (
    <div className="min-h-screen bg-base font-body text-ink">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Work />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
