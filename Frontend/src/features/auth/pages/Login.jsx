import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
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

      {/* Left Side */}

      <section className="hero-section">
        <div className="hero-content">
          <span className="badge">AI Powered Placement Platform</span>

          <h1>
            Welcome to
            <span> CareerPilot</span>
          </h1>

          <p>
            Master DSA, build ATS-friendly resumes, prepare with AI interviews,
            and track your placement journey from one powerful dashboard.
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="icon">📄</div>
              <div>
                <h4>Resume Analyzer</h4>
                <p>Improve your ATS score</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon">💻</div>
              <div>
                <h4>DSA Tracker</h4>
                <p>Track coding progress</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon">🎤</div>
              <div>
                <h4>Mock Interviews</h4>
                <p>AI powered preparation</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="icon">📈</div>
              <div>
                <h4>Analytics</h4>
                <p>Know your strengths</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side */}

      <section className="login-section">
        <div className="glass-card">
          <div className="login-header">
            <h2>Login</h2>

            <p>Continue your placement journey.</p>
          </div>

          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-btn" type="submit">
              Login →
            </button>
          </form>

          <p className="bottom-text">
            Don't have an account? <Link to="/register">Create Account</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
