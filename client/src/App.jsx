// client/src/App.jsx
import { useState } from 'react';
import './App.css';

function App() {
  const [hovered, setHovered] = useState(false);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-200 via-pink-200 to-yellow-100 flex flex-col items-center justify-center px-6 py-12 text-gray-800">
      <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-3xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-6 drop-shadow-sm">
          AutoCorrect Fails Vault
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Discover the funniest texting blunders the internet has to offer. Whether it's "ducking" funny or truly embarrassing, share your auto-correct horror stories and have a laugh!
        </p>

        <button
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered ? '😳 Submit Your Fail!' : '📤 Share Your Story'}
        </button>
      </div>

      <footer className="mt-10 text-sm text-gray-600">
        Made with ❤️ by Team TypoTrackers | #AutocorrectGoneWrong
      </footer>
    </main>
  );
}

export default App;
