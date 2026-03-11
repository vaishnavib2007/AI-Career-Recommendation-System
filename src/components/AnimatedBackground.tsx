const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] animate-blob bg-primary top-[-10%] left-[-5%]" />
    <div className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] animate-blob bg-accent top-[40%] right-[-5%]" style={{ animationDelay: '2s' }} />
    <div className="absolute w-[350px] h-[350px] rounded-full opacity-10 blur-[80px] animate-blob bg-secondary bottom-[-10%] left-[30%]" style={{ animationDelay: '4s' }} />
    <div className="absolute inset-0 dot-grid opacity-30" />
  </div>
);

export default AnimatedBackground;
