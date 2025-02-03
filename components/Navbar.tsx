export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full p-4 flex items-center">
      <div className="flex items-center">
        <img 
          src="/virus-logo.png"
          alt="Nebula AI Logo"
          className="w-6 h-6 mr-2" // Kleines Logo für die Navbar
        />
        <span className="text-white">Nebula AI</span>
      </div>
    </nav>
  );
} 