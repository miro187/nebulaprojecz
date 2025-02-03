import Navbar from '../components/Navbar';
import CountdownSection from '../components/CountdownSection';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-[#0E1117]">
      <Navbar />
      <CountdownSection />
    </div>
  );
} 