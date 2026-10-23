import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Services from "./components/Services";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

// Step 3 redesign: section order matches the locked page plan and the
// numbered eyebrows (02 Work, 03 Services, 04 About). Skills stays
// unnumbered between About and Contact; all nav anchors (#about,
// #services, #work, #contact) still land on their sections.
export default function App() {
  return (
    <div id="top" className="min-h-screen bg-base font-body text-ink">
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
