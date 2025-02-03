import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Moon, ChevronDown } from 'lucide-react';
import Roadmap from './components/Roadmap';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import type { Engine } from 'tsparticles-engine';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    minutes: 0,
    seconds: 20
  });
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScroll, setShowScroll] = useState(true);
  const [isTimerComplete, setIsTimerComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        // Timer reached zero
        clearInterval(timer);
        setIsTimerComplete(true); // Trigger celebration
        return { minutes: 0, seconds: 0 };
      });
    }, 1000);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) { // Pfeil verschwindet nach 100px Scroll
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuliere API-Call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail('');
    
    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesConfig = {
    particles: {
      number: {
        value: 50,
        density: { enable: true, value_area: 1000 }
      },
      color: {
        value: ["#4299E1", "#3182CE", "#2B6CB0", "#63B3ED", "#90CDF4"]
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.6,
        random: true,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false
        }
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "top",
        random: true,
        straight: false,
        outModes: "out",
        attract: {
          enable: true,
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
          mode: "grab"
        },
        resize: true
      }
    },
    background: {
      color: "transparent"
    }
  };

  // Autoplay direkt beim Laden
  useEffect(() => {
    if (audioRef.current) {
      // Set initial volume
      audioRef.current.volume = volume;
      
      // Versuche direkt abzuspielen
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Wenn Autoplay blockiert wird, zeigen wir einen "Play" Button
          setShowPlayButton(true);
        });
      }
    }
  }, []); // Leeres Dependencies Array für einmaliges Ausführen

  // Optional: Zeige Play Button wenn Autoplay fehlschlägt
  const [showPlayButton, setShowPlayButton] = useState(false);

  // Update volume handler
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="relative bg-[#000814] text-white">
      {/* Audio Player */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
        src="/audio/space-ambient.mp3"
      />

      {/* Optional: Play Button falls Autoplay fehlschlägt */}
      {showPlayButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => {
            audioRef.current?.play();
            setShowPlayButton(false);
          }}
          className="fixed top-24 left-4 z-50 p-2 rounded-full bg-[#1A2333]/50 backdrop-blur-xl 
                     border border-blue-500/10 text-blue-400/90 hover:bg-blue-500/5 
                     transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </motion.button>
      )}

      {/* Updated Sound Control Button Group */}
      <div className="fixed top-24 right-4 z-50 flex items-center gap-2">
        <motion.button
          onClick={() => {
            setIsMuted(!isMuted);
            if (audioRef.current) {
              audioRef.current.muted = !isMuted;
            }
          }}
          whileHover={{ width: '160px' }}
          className="p-2 rounded-full bg-[#1A2333]/50 backdrop-blur-xl 
                     border border-blue-500/10 text-blue-400/90 hover:bg-blue-500/5 
                     transition-all duration-200 flex items-center gap-2 overflow-hidden"
        >
          <motion.div
            animate={{ scale: isMuted ? 1 : [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: isMuted ? 0 : Infinity }}
            className="flex-shrink-0"
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileHover={{ opacity: 1, width: 'auto' }}
            className="flex items-center"
          >
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-blue-500/20 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                       [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
                       [&::-webkit-slider-thumb]:bg-blue-400"
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Space Background with electric blue theme */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 animate-pulse-slow" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-15 mix-blend-screen animate-space" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000814]/90 to-[#000814]" />
      </div>

      {/* Celebration Particles - erscheinen nur wenn Timer abgelaufen ist */}
      {isTimerComplete && (
        <Particles
          id="celebration-particles"
          init={particlesInit}
          options={particlesConfig}
          className="fixed inset-0 z-30 pointer-events-none"
        />
      )}

      {/* Main Content Container */}
      <div className="relative z-40">
        {/* Updated Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-blue-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-lg font-medium text-blue-400/90">
                  Nebula AI
                </span>
              </div>
              <div className="flex items-center gap-6">
                {/* Hans Zimmer Partnership Text */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-sm text-blue-400/70 hidden md:block"
                >
                  In partnership with <span className="font-bold">Hans Zimmer</span>
                </motion.span>

                {/* X Dropdown */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-2 rounded-full hover:bg-blue-500/5 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-blue-400/90 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-[#1A2333]/90 backdrop-blur-xl 
                                 rounded-lg border border-blue-500/10 overflow-hidden z-50"
                      >
                        <div className="py-1">
                          <motion.a
                            href="https://x.com/NebulaCoreAi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-200/90 
                                     hover:bg-blue-500/10 transition-colors duration-200"
                            whileHover={{ x: 5 }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 fill-current"
                              aria-hidden="true"
                            >
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span>Nebula Core AI</span>
                          </motion.a>
                          
                          <motion.a
                            href="https://x.com/HansZimmer"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-blue-200/90 
                                     hover:bg-blue-500/10 transition-colors duration-200"
                            whileHover={{ x: 5 }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-4 h-4 fill-current"
                              aria-hidden="true"
                            >
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            <span>Hans Zimmer</span>
                          </motion.a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="relative">
          {/* Hero Section */}
          <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Main Content */}
            <motion.div
              animate={isTimerComplete ? {
                scale: [1, 1.1, 1],
                transition: { duration: 1.5, ease: "easeInOut" }
              } : {}}
              className="relative z-20 text-center max-w-lg mx-auto -mt-20"
            >
              {/* Logo */}
              <motion.div
                animate={isTimerComplete ? {
                  rotate: 360,
                  scale: [1, 1.2, 1],
                  transition: { duration: 2, ease: "easeInOut" }
                } : {}}
                className="w-64 h-64 mx-auto mb-2"
              >
                <img 
                  src="images/logo.png" 
                  alt="Nebula AI Logo" 
                  className="w-full h-full object-contain animate-float"
                />
              </motion.div>
              
              {/* Title with animation */}
              <motion.h1
                animate={isTimerComplete ? {
                  scale: [1, 1.1, 1],
                  color: ["#E2E8F0", "#4299E1", "#E2E8F0"],
                  transition: { duration: 2 }
                } : {}}
                className="text-3xl md:text-4xl font-medium mb-4 tracking-wider text-blue-100/90"
              >
                {isTimerComplete ? "Welcome to Nebula AI" : "Something is Coming"}
              </motion.h1>
              
              {/* Timer/Message Section */}
              <AnimatePresence mode="wait">
                {!isTimerComplete ? (
                  <motion.div
                    key="timer"
                    exit={{ opacity: 0, y: -20 }}
                    className="inline-flex items-center justify-center space-x-2 font-mono text-4xl md:text-5xl mb-6 text-blue-200/90"
                  >
                    <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="animate-pulse">:</span>
                    <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl text-blue-300 mb-6"
                  >
                    Experience the next generation of AI
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Description and Form */}
              <motion.div
                animate={isTimerComplete ? {
                  y: [0, 10, 0],
                  transition: { duration: 1 }
                } : {}}
                className="space-y-4 text-sm md:text-base"
              >
                <p className="text-blue-200/70">
                  The future of AI is about to be redefined
                </p>
                <p className="text-blue-300/50 text-sm">
                  Join us as we unveil the next evolution
                </p>

                {/* Email Form oder X Link, abhängig vom Timer */}
                <AnimatePresence mode="wait">
                  {!isTimerComplete ? (
                    <motion.div
                      key="email-form"
                      exit={{ opacity: 0, y: 20 }}
                      className="relative z-50 max-w-md mx-auto"
                    >
                      <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onSubmit={handleSubmit}
                        className="relative"
                      >
                        <motion.div
                          initial={{ scale: 0.95 }}
                          whileHover={{ scale: 1 }}
                          className="flex gap-2 p-1 bg-[#1A2333]/50 backdrop-blur-xl rounded-lg border border-blue-500/10"
                        >
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="flex-1 px-4 py-2 bg-transparent text-blue-100 placeholder-blue-400/50 outline-none rounded-md"
                          />
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-blue-500 text-white rounded-md font-medium 
                                     hover:bg-blue-600 transition-all duration-200 disabled:opacity-70"
                          >
                            {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              'Get Updates'
                            )}
                          </button>
                        </motion.div>

                        {/* Success Message */}
                        <AnimatePresence>
                          {isSubmitted && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute left-0 right-0 top-full mt-2 text-center"
                            >
                              <span className="text-green-400 text-sm">
                                Thank you for subscribing!
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="x-link"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex justify-center relative z-50"
                    >
                      <motion.a
                        href="https://x.com/NebulaCoreAi"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-[#1A2333]/50 backdrop-blur-xl 
                                 rounded-lg border border-blue-500/10 text-blue-400/90 
                                 hover:bg-blue-500/5 transition-all duration-200"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5 fill-current"
                          aria-hidden="true"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span>Follow us on X</span>
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Electric Blue Glow Effects */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            </motion.div>

            {/* Scroll Indicator Arrow */}
            <AnimatePresence>
              {showScroll && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20"
                >
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-blue-400/50 cursor-pointer hover:text-blue-400/80 transition-colors"
                    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                  >
                    <ChevronDown size={32} strokeWidth={1} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Roadmap Section */}
          <Roadmap />
        </div>
      </div>
    </div>
  );
}

export default App;