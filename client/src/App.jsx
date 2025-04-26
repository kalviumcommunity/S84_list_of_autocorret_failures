import './App.css';
import AutocorrectFail from './components/AutocorrectFail';
import UpdateFailurePage from './components/UpdateFailurePage';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  const [fails, setFails] = useState([]);
  const [filteredFails, setFilteredFails] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again.');
    }
  };

  const fetchFails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/failures');
      setFails(response.data);
      setFilteredFails(response.data);
    } catch (err) {
      console.error('Error fetching fails:', err);
      setError('Failed to fetch fails. Please try again.');
    }
  };

  const fetchFailsByUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/failures/user/${userId}`, {
        params: { page, limit: 5 },
      });
      setFilteredFails(response.data.failures);
    } catch (err) {
      console.error('Error fetching fails by user:', err);
      setError('Failed to fetch fails for this user. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        { username: loginUsername },
        { withCredentials: true }
      );
      setUser(response.data.user);
      setNotification('Login successful!');
      setTimeout(() => setNotification(null), 3000);
      setError(null);
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err.response?.data?.error || 'Failed to login. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      setUser(null);
      setLoginUsername('');
      setNotification('Logout successful!');
      setTimeout(() => setNotification(null), 3000);
      setError(null);
    } catch (err) {
      console.error('Error logging out:', err);
      setError('Failed to logout. Please try again.');
    }
  };

  const handleRefreshToken = async () => {
    try {
      await axios.post('http://localhost:3000/refresh-token', {}, { withCredentials: true });
    } catch (err) {
      console.error('Error refreshing token:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchFails();
    const interval = setInterval(handleRefreshToken, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchFailsByUser(selectedUserId);
    } else {
      setFilteredFails(fails);
    }
  }, [selectedUserId, fails, page]);

  const handleAddFail = (newFail) => {
    setFails([...fails, newFail]);
    setFilteredFails([...fails, newFail]);
    setNotification('New fail added successfully!');
    setTimeout(() => setNotification(null), 3000);
    setError(null);
  };

  const handleDeleteFail = async (id) => {
    if (window.confirm('Are you sure you want to delete this fail?')) {
      try {
        await axios.delete(`http://localhost:3000/failures/${id}`, { withCredentials: true });
        fetchFails();
        setNotification('Fail deleted successfully!');
        setTimeout(() => setNotification(null), 3000);
        setError(null);
      } catch (err) {
        console.error('Error deleting fail:', err);
        setError('Failed to delete fail. Please try again.');
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = fails.filter(fail =>
      fail.text.toLowerCase().includes(query) ||
      fail.intended.toLowerCase().includes(query) ||
      fail.submitted_by.toLowerCase().includes(query)
    );
    setFilteredFails(filtered);
  };

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page > 1 ? page - 1 : 1);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <video autoPlay loop muted className="background-video">
                <source src="/123.mp4" type="video/mp4" />
                Your browser does not support the video tag or the video file is missing.
              </video>
              <div className="content">
                <h1 className="site-title">Silly Autocorrects</h1>
                <div className="flex justify-center mb-4">
                  {user ? (
                    <div className="flex items-center">
                      <span className="mr-2">Logged in as: {user.username}</span>
                      <button onClick={handleLogout} className="submit-btn bg-red-500 hover:bg-red-600">
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        placeholder="Enter username"
                        className="p-2 border rounded mr-2"
                      />
                      <button onClick={handleLogin} className="submit-btn">
                        Login
                      </button>
                    </div>
                  )}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search fails..."
                    className="p-2 border rounded ml-4"
                  />
                </div>
                <h1>List of Auto-correct Failures</h1>
                <p className="tagline">Welcome to the most hilarious collection of texting disasters!</p>
                {notification && <div className="notification">{notification}</div>}
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
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (!user) {
                        setError('Please log in to submit a fail.');
                        return;
                      }
                      const userEntry = users.find((u) => u.username === e.target.submittedBy.value);
                      if (!userEntry) {
                        setError('User does not exist. Please use an existing username.');
                        return;
                      }
                      const formData = {
                        text: e.target.text.value,
                        intended: e.target.intended.value,
                        fail_level: e.target.failLevel.value,
                        context: e.target.context.value,
                        submitted_by: e.target.submittedBy.value,
                        created_by: userEntry.id,
                      };
                      try {
                        const response = await axios.post('http://localhost:3000/failures', formData, {
                          withCredentials: true,
                        });
                        handleAddFail(response.data);
                        e.target.reset();
                      } catch (err) {
                        console.error('Error submitting fail:', err);
                        setError('Failed to submit fail. Please try again.');
                      }
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
                        placeholder="Enter username (e.g., john_doe)"
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
                  <h2>Filter Failures by User</h2>
                  <div className="form-group">
                    <label>Select User</label>
                    <select
                      value={selectedUserId || ''}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                    >
                      <option value="">All Users</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.username}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button onClick={handlePrevPage} className="submit-btn mr-2">Previous</button>
                    <button onClick={handleNextPage} className="submit-btn">Next</button>
                    <span> Page {page}</span>
                  </div>
                </section>
                <section className="info-section">
                  <h2>Fetched Failures</h2>
                  <div className="fail-gallery">
                    {filteredFails.map((fail) => (
                      <div key={fail.id} className="fail-card">
                        <AutocorrectFail {...fail} onDelete={() => handleDeleteFail(fail.id)} />
                      </div>
                    ))}
                  </div>
                </section>
                {user && (
                  <section className="info-section">
                    <h2>Your Submitted Fails</h2>
                    <div className="fail-gallery">
                      {filteredFails.filter(fail => fail.created_by === user.id).map((fail) => (
                        <div key={fail.id} className="fail-card">
                          <AutocorrectFail {...fail} />
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          }
        />
        <Route path="/update/:id" element={<UpdateFailurePage />} />
      </Routes>
    </Router>
  );
}