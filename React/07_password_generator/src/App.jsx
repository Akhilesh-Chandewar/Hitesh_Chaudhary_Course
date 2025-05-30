import React, { useState, useRef, useCallback } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+{}[]<>?/|';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';

    let characters = '';
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;
    if (includeUppercase) characters += uppercase;
    if (includeLowercase) characters += lowercase;

    if (!characters) return setPassword('');

    let generated = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generated += characters[randomIndex];
    }

    setPassword(generated);

    // Optional: focus/select
    setTimeout(() => {
      passwordRef.current?.focus();
      passwordRef.current?.select();
    }, 0);
  }, [length, includeNumbers, includeSymbols, includeUppercase, includeLowercase]);

  const copyToClipboard = useCallback(() => {
    if (!password) return;

    passwordRef.current?.select();
    navigator.clipboard.writeText(password);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }, [password]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 relative">
      <div className="w-full max-w-md shadow-md rounded-lg px-6 py-5 bg-gray-800 text-orange-400">
        <h1 className="text-white text-center text-2xl font-semibold mb-6">Password Generator</h1>

        <div className="flex shadow-inner rounded-lg overflow-hidden mb-4">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-700 text-white placeholder-gray-400"
            placeholder="Your password"
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="outline-none bg-blue-600 text-white px-4 py-2 hover:bg-blue-500 shrink-0"
          >
            Copy
          </button>
        </div>

        <button
          onClick={generatePassword}
          className="w-full mb-6 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
        >
          Generate Password
        </button>

        <div className="space-y-4 text-sm text-white">
          <div>
            <label htmlFor="length" className="block mb-1">
              Length: <span className="text-orange-400 font-bold">{length}</span>
            </label>
            <input
              type="range"
              id="length"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              Numbers
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              Symbols
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
              />
              Uppercase
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
              />
              Lowercase
            </label>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="absolute bottom-8 bg-green-600 text-white px-4 py-2 rounded shadow transition">
          Password copied to clipboard!
        </div>
      )}
    </div>
  );
}

export default App;
