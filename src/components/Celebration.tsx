import { motion } from 'framer-motion';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from 'tsparticles-engine';
import { useCallback } from "react";
import ThreeDElements from './ThreeDElements';

export default function Celebration() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesConfig = {
    particles: {
      number: {
        value: 100,
        density: { enable: true, value_area: 800 }
      },
      color: {
        value: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.8,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 6,
        random: true,
        animation: {
          enable: true,
          speed: 4,
          minimumValue: 0.3,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 3,
        direction: "none",
        random: false,
        straight: false,
        outModes: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        },
        resize: true
      }
    },
    background: {
      color: "transparent"
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50"
    >
      <ThreeDElements />
      <Particles
        id="celebration-particles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0"
      />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            duration: 1.5,
            bounce: 0.5 
          }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-8">
            We Are Live!
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-blue-500 text-white rounded-lg text-xl font-medium
                     hover:bg-blue-600 transition-colors duration-200"
          >
            Enter Platform
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
} 