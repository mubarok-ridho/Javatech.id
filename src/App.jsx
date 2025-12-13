import React from 'react';
import Header from "./components/layout/Header";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Stats from "./components/sections/Stats";
import Projects from "./components/sections/Projects";
// import Team from "./components/sections/Team";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Projects />
        {/* <Team /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;