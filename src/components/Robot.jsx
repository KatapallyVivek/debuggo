export default function Robot({ size = 250 }) {
  return (
    <div className="flex justify-center mb-6">
      <img
        src="/robot.gif"
        alt="Robot"
        style={{ width: size, height: size }}
      />
    </div>
  );
}
