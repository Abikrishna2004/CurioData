import React, { useState, useCallback } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import { uploadDataFile } from './services/api'; 

import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 
import { FaLinkedin, FaInstagram, FaGithub, FaUser } from 'react-icons/fa';

import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    try {
      const response = await uploadDataFile(file);
      setAnalysisData(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      if (error.response && error.response.data && error.response.data.detail) {
        alert("Error: " + error.response.data.detail);
      } else {
        alert("Error uploading file. Is the backend server running?");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0
    },
    out: {
      opacity: 0,
      y: -20
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };


  return (
    <div className="App">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent", 
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: "out",
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />

      <header className="App-header">
        <AnimatePresence mode="wait">
          {!analysisData ? (
            <motion.div
              key="upload"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="page-container" 
            >
              <img 
                src="/compile.journey.jpg" 
                alt="CurioData Logo" 
                className="app-logo"
              />
              <h1>CurioData</h1>
              <p className="subtitle">Powered by Compile Journey</p>
              <p className="slogan">Where Curiosity Compiles Creativity</p>
              <FileUpload onUpload={handleFileUpload} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="page-container"
            >
              <Dashboard data={analysisData} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <footer className="App-footer">
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/abikrishna-p-21195b304" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Abikrishna2004" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaGithub />
          </a>
          <a href="https://www.instagram.com/compile.journey" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
          <a href="https://abikrishna2004.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaUser />
          </a>
        </div>
        <p>© 2025 CurioData | Powered by Compile Journey</p>
      </footer>
    </div>
  );
}

export default App;