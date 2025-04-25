import './App.css';
import AutocorrectFail from './components/AutocorrectFail';
import AddFailureForm from './components/AddFailureForm';
import UpdateFailurePage from './components/UpdateFailurePage';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  const [fails, setFails] = useState([]);
  const [error, setError] = useState(null);

  const fetchFails = () => {
    axios
      .get('http://localhost:3000/failures')
      .then((res) => setFails(res.data))
      .catch((err) => {
        console.error('Error fetching fails:', err);
        setError('Failed to fetch fails. Please try again.');
      });
  };

  useEffect(() => {
    fetchFails();
  }, []);

  const handleAddFail = (newFail) => {
    setFails([...fails, newFail]);
    setError(null);
    alert('New fail added successfully!');
  };

  const handleDeleteFail = async (id) => {
    if (window.confirm('Are you sure you want to delete this fail?')) {
      try {
        await axios.delete(`http://localhost:3000/failures/${id}`);
        fetchFails(); // Refresh list
        setError(null);
        alert('Fail deleted successfully!');
      } catch (err) {
        console.error('Error deleting fail:', err);
        setError('Failed to delete fail. Please try again.');
      }
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <video autoPlay loop muted className="background-video">
                <source src="/123.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="content">
                <h1 className="site-title">Silly Autocorrects</h1>
                <h1>List of Auto-correct Failures</h1>
                <p className="tagline">Welcome to the most hilarious collection of texting disasters!</p>
                {error && <p className="text-red-500">{error}</p>}
                <section className="info-section">
                  <h2>What is this site about?</h2>
                  <p>
                    This project collects and showcases some of the funniest and weirdest auto-correct fails people have
                    experienced. It's designed to entertain, and maybe make you feel better about your own typos.
                  </p>
                </section>
                <section className="info-section">
                  <h2>Why this project?</h2>
                  <p>
                    It’s light-hearted, it’s relatable, and it gives you a fun way to work with full-stack tools, routes,
                    databases, and more!
                  </p>
                </section>
                <section className="info-section submit-form">
                  <h2>Submit a New Autocorrect Fail</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = {
                        text: e.target.text.value,
                        intended: e.target.intended.value,
                        failLevel: e.target.failLevel.value,
                        context: e.target.context.value,
                        submittedBy: e.target.submittedBy.value,
                      };
                      axios
                        .post('http://localhost:3000/failures', formData)
                        .then((res) => {
                          handleAddFail(res.data);
                          e.target.reset();
                        })
                        .catch((err) => {
                          console.error('Error submitting fail:', err);
                          setError('Failed to submit fail. Please try again.');
                        });
                    }}
                    className="fail-form"
                  >
                    <div className="form-group">
                      <label>Autocorrected Text</label>
                      <input
                        type="text"
                        name="text"
                        placeholder="E.g., ‘Let’s meat at noon’"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Intended Text</label>
                      <input
                        type="text"
                        name="intended"
                        placeholder="E.g., ‘Let’s meet at noon’"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Context</label>
                      <input
                        type="text"
                        name="context"
                        placeholder="E.g., Planning lunch"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Submitted By</label>
                      <input
                        type="text"
                        name="submittedBy"
                        placeholder="Your name or nickname"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Fail Level</label>
                      <select name="failLevel" defaultValue="moderate">
                        <option value="low">Low</option>
                        <option value="moderate">Moderate</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <button type="submit" className="submit-btn">
                      Submit Fail
                    </button>
                  </form>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                </section>
                <section className="info-section">
                  <h2>Fetched Failures</h2>
                  {fails.map((fail) => (
                    <AutocorrectFail
                      key={fail._id}
                      {...fail}
                      onDelete={() => handleDeleteFail(fail._id)}
                    />
                  ))}
                </section>
              </div>
            </div>
          }
        />
        <Route path="/update/:id" element={<UpdateFailurePage />} />
      </Routes>
    </Router>
  );
}