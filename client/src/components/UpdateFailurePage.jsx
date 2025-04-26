import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UpdateFailurePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    text: '',
    intended: '',
    fail_level: 'moderate',
    context: '',
    submitted_by: '',
    created_by: '',
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again.');
      }
    };
    fetchUsers();
    axios
      .get(`http://localhost:3000/failures/${id}`)
      .then((res) => setFormData(res.data))
      .catch((err) => {
        console.error('Error fetching fail:', err);
        setError('Failed to load fail. Please try again.');
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/failures/${id}`, formData);
      alert('Fail updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating fail:', err);
      setError('Failed to update fail. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <video autoPlay loop muted className="background-video">
        <source src="/123.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1 className="site-title">Silly Autocorrects</h1>
        {error && <p className="text-red-500">{error}</p>}
        <section className="info-section fail-form">
          <h2>Update Autocorrect Fail</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Autocorrected Text</label>
              <input
                type="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Intended Text</label>
              <input
                type="text"
                name="intended"
                value={formData.intended}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Context</label>
              <input
                type="text"
                name="context"
                value={formData.context}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Submitted By</label>
              <input
                type="text"
                name="submitted_by"
                value={formData.submitted_by}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Created By</label>
              <select
                name="created_by"
                value={formData.created_by}
                onChange={handleChange}
                required
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Fail Level</label>
              <select name="fail_level" value={formData.fail_level} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
            <button type="submit" className="submit-btn">Update Fail</button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="submit-btn bg-gray-500 hover:bg-gray-600 ml-2"
            >
              Cancel
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}