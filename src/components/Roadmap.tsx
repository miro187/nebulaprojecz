import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface RoadmapItem {
  phase: string;
  title: string;
  description: string;
  date: string;
  features: string[];
  icon?: string;
}

const roadmapData: RoadmapItem[] = [
  {
    phase: "Phase 1",
    title: "Foundation & Research",
    description: "Establishing core AI infrastructure and advanced research initiatives",
    date: "Q1 2025",
    features: [
      "Advanced Neural Network Development",
      "Quantum Computing Integration Research",
      "Core Infrastructure Setup",
      "Initial AI Model Training"
    ],
    icon: "🧬"
  },
  {
    phase: "Phase 2",
    title: "AI Model Evolution",
    description: "Expanding capabilities and implementing breakthrough technologies",
    date: "Q2 2025",
    features: [
      "Multi-Modal AI Implementation",
      "Enhanced Natural Language Processing",
      "Real-time Learning Systems",
      "Advanced Pattern Recognition"
    ],
    icon: "🔮"
  },
  {
    phase: "Phase 3",
    title: "Ecosystem Expansion",
    description: "Building partnerships and expanding our technological reach",
    date: "Q3 2025",
    features: [
      "Global Partnership Network",
      "Developer API Platform Launch",
      "Enterprise Solutions Integration",
      "Community-Driven Development"
    ],
    icon: "🌐"
  },
  {
    phase: "Phase 4",
    title: "Global Innovation",
    description: "Revolutionizing AI applications across industries",
    date: "Q4 2025",
    features: [
      "Cross-Industry AI Solutions",
      "Autonomous Systems Launch",
      "Advanced Security Protocols",
      "Global Scale Infrastructure"
    ],
    icon: "🚀"
  }
];

const FeatureList = ({ features }: { features: string[] }) => {
  return (
    <div className="mt-4 space-y-2">
      {features.map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
          <span className="text-sm text-blue-200/60">{feature}</span>
        </motion.div>
      ))}
    </div>
  );
};

const RoadmapItem = ({ item, index }: { item: RoadmapItem; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.3
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Timeline line */}
      <div className="hidden md:block w-1/2 relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: "100%" } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-[2px] bg-gradient-to-r from-blue-400 to-blue-600"
        />
      </div>

      {/* Content */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-full md:w-1/2 bg-[#0A101F]/80 backdrop-blur-lg rounded-xl p-6 border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 group"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-2xl"
          >
            {item.icon}
          </motion.span>
          <div>
            <span className="text-blue-400 text-sm font-medium">{item.phase}</span>
            <span className="text-blue-300/50 text-sm ml-4">{item.date}</span>
          </div>
        </div>
        <h3 className="text-xl font-medium text-blue-100 mb-2 group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-blue-200/70">{item.description}</p>
        <FeatureList features={item.features} />
      </motion.div>
    </motion.div>
  );
};

export default function Roadmap() {
  return (
    <section className="relative py-20 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-medium mb-4 text-blue-100">
            Our Vision for 2025
          </h2>
          <p className="text-blue-200/70">
            Pioneering the next generation of artificial intelligence
          </p>
        </motion.div>

        <div className="space-y-20">
          {roadmapData.map((item, index) => (
            <RoadmapItem key={item.phase} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 