// client/src/App.jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [hovered, setHovered] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-200 via-yellow-100 to-pink-200 flex flex-col items-center justify-center px-6 py-12 text-gray-800 font-sans">
      <div className="bg-white/70 backdrop-blur-xl shadow-2xl p-10 rounded-3xl max-w-4xl w-full text-center border border-gray-200">
        <h1 className="text-6xl sm:text-7xl font-black text-purple-700 tracking-tight drop-shadow-lg mb-6 animate-fade-in">
          🤖 AutoCorrect Disasters
        </h1>

        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          Ever texted "I love your duck" instead of "luck"? You're not alone. This is the place where the keyboard betrays us all. Submit your funniest autocorrect fails and enjoy the cringe together!
        </p>

        <button
          className="px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? '😱 Tell Your Tale' : '📤 Share a Fail'}
        </button>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left text-gray-800">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="font-semibold text-lg mb-2">🔥 Trending Fail</h3>
            <p className="text-sm">"I'll meat you at the mall" — classic case of dinner plans gone rogue.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="font-semibold text-lg mb-2">🎯 Why This Site?</h3>
            <p className="text-sm">Because laughter is the best typo remedy. And we're tired of apologizing to ducks.</p>
          </div>
        </div>
      </div>

      <footer className="mt-10 text-sm text-gray-600">
        © 2025 AutoFail Diaries | Built with ☕ + ❤️
      </footer>
    </main>
  );
}

export default App;
