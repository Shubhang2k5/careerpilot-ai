import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main className="auth-page">
        <div className="loader">Loading...</div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="bg-circle circle-1"></div>
      <div className="bg-circle circle-2"></div>

      {/* Left Section */}

      <section className="hero-section">
        <div className="hero-content">
          <span className="badge">AI Powered Placement Platform</span>

          <h1>
            <span>Your</span>
            AI Placement Companion
            <span> CareerPilot</span>
          </h1>

          <p>
            Create your account and unlock AI-powered interview preparation,
            resume analysis, coding progress tracking, and placement analytics
            in one dashboard.
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon">📄</div>

              <div>
                <h4>Resume Builder</h4>
                <p>Create ATS friendly resumes</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon">💻</div>

              <div>
                <h4>DSA Tracker</h4>
                <p>Track your coding journey</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon">🎤</div>

              <div>
                <h4>Mock Interviews</h4>
                <p>Practice with AI</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon">📈</div>

              <div>
                <h4>Placement Analytics</h4>
                <p>Monitor your progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Section */}

      <section className="login-section">
        <div className="glass-card">
          <div className="login-header">
            <h2>Create Account</h2>

            <p>Start your placement journey today.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-btn" type="submit">
              Create Account →
            </button>
          </form>

          <p className="bottom-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
