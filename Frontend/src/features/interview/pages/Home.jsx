import React, { useState, useRef } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const { handleLogout } = useAuth();
  
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();

  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    console.log(resumeInputRef.current.files);
    const resumeFile = resumeInputRef.current.files[0];
    console.log("Resume File:", resumeFile);
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="home-page">
      {/* ================= HERO SECTION ================= */}

      <header className="page-header">
        <div className="navbar">
          <div className="brand">
            <div className="brand__logo">CP</div>

            <div className="brand__text">
              <h2>CareerPilot</h2>
              <span>AI Powered Interview Preparation</span>
            </div>
          </div>

          <button
            className="logout-btn"
            onClick={async () => {
              await handleLogout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>

        <div className="hero-content">
          <div className="hero-badge">🚀 Smart Resume Matching</div>

          <h1>
            Create Your
            <span className="highlight"> Dream Interview Strategy</span>
          </h1>

          <p>
            Upload your resume or describe your profile. CareerPilot analyzes
            your experience, compares it with the job description, identifies
            missing skills, and prepares a complete interview roadmap tailored
            specifically for you.
          </p>

          <div className="hero-stats">
            <div className="stat-card">
              <h3>95%</h3>

              <span>AI Accuracy</span>
            </div>

            <div className="stat-card">
              <h3>30s</h3>

              <span>Average Time</span>
            </div>

            <div className="stat-card">
              <h3>100+</h3>

              <span>Interview Questions</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Card */}
      <div className="interview-card">
        <div className="interview-card__body">
          {/* ================= LEFT PANEL ================= */}

          <div className="panel panel--left">
            <div className="panel-top">
              <div className="panel__header">
                <div className="title-group">
                  <span className="panel__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>

                  <div>
                    <h2>Target Job Description</h2>

                    <p className="panel-subtitle">
                      Paste the complete job description from the company.
                    </p>
                  </div>
                </div>

                <span className="badge badge--required">Required</span>
              </div>
            </div>

            <div className="textarea-wrapper">
              <textarea
                onChange={(e) => {
                  setJobDescription(e.target.value);
                }}
                className="panel__textarea job-textarea"
                placeholder={`Paste the complete Job Description...

Example:

Frontend Developer

Requirements:

• React
• JavaScript
• REST APIs
• Git
• HTML
• CSS
• TypeScript

Responsibilities:

Build scalable web applications...
`}
                maxLength={5000}
              />

              <div className="char-counter">
                <span>Maximum 5000 characters</span>
              </div>
            </div>

            <div className="panel-footer">
              <div className="footer-tip">
                💡 Better Job Description = Better Interview Questions
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="panel-divider" />

          {/* ================= RIGHT PANEL ================= */}

          <div className="panel panel--right">
            <div className="panel__header">
              <div className="title-group">
                <span className="panel__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>

                <div>
                  <h2>Your Profile</h2>
                  <p className="panel-subtitle">
                    Upload your resume or write about yourself.
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Upload */}

            <div className="upload-section">
              <label className="section-label">
                Resume Upload
                <span className="badge badge--best">Best Results</span>
              </label>

              <label className="dropzone" htmlFor="resume">
                <div className="dropzone__content">
                  <div className="dropzone__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                  </div>

                  <h3>Upload Resume</h3>

                  <p>
                    Drag & Drop
                    <br />
                    or Click to Browse
                  </p>

                  <small>PDF • DOCX • Max 5 MB</small>
                </div>

                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                />
              </label>
            </div>

            <div className="or-divider">
              <span>or</span>
            </div>

            {/* Self Description */}

            <div className="self-description">
              <label className="section-label" htmlFor="selfDescription">
                Self Description
              </label>

              <textarea
                id="selfDescription"
                name="selfDescription"
                className="panel__textarea panel__textarea--short"
                onChange={(e) => {
                  setSelfDescription(e.target.value);
                }}
                placeholder="Describe your education, projects, technical skills, internship experience and achievements..."
              />
            </div>

            <div className="info-box">
              <span className="info-box__icon">💡</span>

              <p>
                You can generate a report using either
                <strong> Resume </strong>
                or
                <strong> Self Description.</strong>
                Providing both gives the best results.
              </p>
            </div>
          </div>
        </div>
        {/* ================= FOOTER ACTION ================= */}

        <div className="interview-card__footer">
          <div className="footer-left">
            <div className="footer-badge">🤖</div>

            <div>
              <h4>Ready to Generate?</h4>

              <p>
                Your interview strategy will be generated using AI in
                approximately 30 seconds.
              </p>
            </div>
          </div>

          <button onClick={handleGenerateReport} className="generate-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            Generate AI Interview Plan
          </button>
        </div>
      </div>

      {/* ================= RECENT REPORTS ================= */}

      {reports.length > 0 && (
        <section className="recent-reports">
          <div className="recent-header">
            <div>
              <h2>Recent Interview Plans</h2>

              <p>Open any report you've previously generated.</p>
            </div>
          </div>

          <div className="reports-grid">
            {reports.map((report) => (
              <div
                key={report._id}
                className="report-card"
                onClick={() => navigate(`/interview/${report._id}`)}
              >
                <div className="report-card__top">
                  <h3>{report.title || "Untitled Position"}</h3>

                  <span
                    className={`score-badge ${
                      report.matchScore >= 80
                        ? "score--high"
                        : report.matchScore >= 60
                          ? "score--mid"
                          : "score--low"
                    }`}
                  >
                    {report.matchScore}%
                  </span>
                </div>

                <p className="report-date">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>

                <div className="report-progress">
                  <div
                    className="report-progress-fill"
                    style={{
                      width: `${report.matchScore}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= FOOTER ================= */}

      <footer className="page-footer">
        <div className="footer-left">
          <h3>CareerPilot AI</h3>
          <p>Built with React • Node.js • Gemini AI</p>
          <span>© 2026 CareerPilot. All rights reserved.</span>
        </div>

        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
