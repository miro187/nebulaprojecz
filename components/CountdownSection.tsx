export default function CountdownSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-gray-400">The future of AI is about to be redefined</p>
      
      <div className="my-8 relative">
        <img 
          src="/virus-logo.png"
          alt="AI Logo"
          className="rotating-logo"
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">Something is Coming</h1>
      <div className="text-3xl font-mono mb-8">
        {/* Timer component */}
      </div>
      
      <p className="text-gray-400">Join us as we unveil the next evolution</p>
    </div>
  );
} 