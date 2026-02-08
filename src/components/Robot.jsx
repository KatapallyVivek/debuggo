export default function Robot({ size = 180 }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="
        relative
        animate-float
        drop-shadow-[0_0_40px_rgba(99,102,241,0.6)]
      ">
        <img
          src="/robot.gif"
          alt="AI Robot"
          style={{ width: size, height: size }}
        />

        {/* Glow aura */}
        <div className="
          absolute inset-0
          rounded-full
          blur-3xl
          bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500
          opacity-30
          -z-10
        " />
      </div>
    </div>
  );
}
