import "./App.css";
import AutocorrectFail from './components/AutocorrectFail';
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [fails, setFails] = useState([]);
  const [formData, setFormData] = useState({
    text: '',
    intended: '',
    failLevel: 'moderate',
    context: '',
    submittedBy: ''
  });

  useEffect(() => {
    axios.get("http://localhost:3000/failures")
      .then(res => setFails(res.data))
      .catch(err => console.error("Error fetching fails:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/failures", formData);
      setFails([...fails, res.data]);
      setFormData({
        text: '',
        intended: '',
        failLevel: 'moderate',
        context: '',
        submittedBy: ''
      });
    } catch (err) {
      console.error("Error adding fail:", err);
    }
  };

  return (
    <div className="app-container">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/123.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Section */}
      <div className="content">
        {/* Logo Title */}
        <h1 className="site-title">
          Silly Autocorrects
        </h1>

        {/* Tagline */}
        <h1>List of Auto-corrects Failures</h1>
        <p className="tagline">Welcome to the most hilarious collection of texting disasters!</p>

        {/* About Sections */}
        <section className="info-section">
          <h2>What is this site about?</h2>
          <p>
            This project collects and showcases some of the funniest and weirdest auto-correct fails people have experienced. 
            It's designed to entertain, and maybe make you feel better about your own typos.
          </p>
        </section>

        <section className="info-section">
          <h2>Why this project?</h2>
          <p>
            It’s light-hearted, it’s relatable, and it gives you a fun way to work with full-stack tools, routes, databases, and more!
          </p>
        </section>

        {/* Example Failures */}
        <section className="info-section">
          <h2>Failures</h2>
          <p><strong>Text:</strong> "Let’s meat at noon"</p>                   
          <p><strong>Intended:</strong> "Let’s meet at noon"</p>
          <p><strong>Fail Level:</strong> Moderate</p>
          <p><strong>Context:</strong> Lunch planning</p>
          <p><strong>Submitted By:</strong> funnyUser99</p>
          <p><strong>Timestamp:</strong> 2025-04-23T12:00:00Z</p>
        </section>

        {/* ✅ Add Fail Form */}
        <section className="info-section">
          <h2>Submit a Fail</h2>
          <form onSubmit={handleSubmit}>
            <input name="text" placeholder="Text" value={formData.text} onChange={handleChange} required />
            <input name="intended" placeholder="Intended" value={formData.intended} onChange={handleChange} required />
            <input name="context" placeholder="Context" value={formData.context} onChange={handleChange} required />
            <input name="submittedBy" placeholder="Submitted By" value={formData.submittedBy} onChange={handleChange} required />
            <select name="failLevel" value={formData.failLevel} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
            <button type="submit">Add Fail</button>
          </form>
        </section>

        {/* Render dynamic fails from backend */}
        <section className="info-section">
          <h2>Fetched Failures</h2>
          {fails.map((fail) => (
            <div key={fail._id}>
              <p><strong>Text:</strong> {fail.text}</p>
              <p><strong>Intended:</strong> {fail.intended}</p>
              <p><strong>Fail Level:</strong> {fail.failLevel}</p>
              <p><strong>Context:</strong> {fail.context}</p>
              <p><strong>Submitted By:</strong> {fail.submittedBy}</p>
              <p><strong>Timestamp:</strong> {new Date(fail.timestamp).toLocaleString()}</p>
              <hr />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
