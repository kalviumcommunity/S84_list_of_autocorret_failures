// components/AddFailureForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function AddFailureForm({ onAdd }) {
  const [formData, setFormData] = useState({
    text: '',
    intended: '',
    failLevel: 'moderate',
    context: '',
    submittedBy: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/fails", formData);
      onAdd(res.data); // Update list in App.jsx
      setFormData({ text: '', intended: '', failLevel: 'moderate', context: '', submittedBy: '' });
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="info-section">
      <h2>Submit a New Fail</h2>
      <input name="text" placeholder="Text" value={formData.text} onChange={handleChange} required />
      <input name="intended" placeholder="Intended" value={formData.intended} onChange={handleChange} required />
      <input name="context" placeholder="Context" value={formData.context} onChange={handleChange} required />
      <input name="submittedBy" placeholder="Your Name" value={formData.submittedBy} onChange={handleChange} required />
      <select name="failLevel" value={formData.failLevel} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="moderate">Moderate</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Submit Fail</button>
    </form>
  );
}
