import { useState } from "react";

const ColorButton = ({ label, color, onClick }) => (
  <button
    title={`Set background to ${label}`}
    className="px-4 py-2 text-white rounded hover:brightness-110"
    style={{ backgroundColor: color }}
    onClick={() => onClick(color)}
  >
    {label}
  </button>
);

function App() {
  const [bgColor, setBgColor] = useState("#ffffff");

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{ backgroundColor: bgColor }}
    >
      <h1 className="text-3xl font-bold mb-4 text-white">Background Color Changer</h1>

      <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-lg">
        <ColorButton label="Blue" color="#3b82f6" onClick={setBgColor} />
        <ColorButton label="Red" color="#ef4444" onClick={setBgColor} />
        <ColorButton label="Green" color="#22c55e" onClick={setBgColor} />
      </div>

      <div className="mt-4 bg-white p-4 rounded-lg shadow-lg text-black">
        <p className="mb-2">
          Current Background Color: <span className="font-mono">{bgColor}</span>
        </p>
        <label>
          Change Background Color:
          <input
            type="color"
            className="ml-2 mt-2 p-1 border rounded cursor-pointer"
            onChange={(e) => setBgColor(e.target.value)}
            value={bgColor}
            aria-label="Select a background color"
          />
        </label>
      </div>
    </div>
  );
}

export default App;
