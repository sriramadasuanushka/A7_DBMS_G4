import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <Link to="/" className="brand">
          <div className="brand-logo">W</div>

          <div className="brand-name">
            Wellness<span>+</span>
            <small>INTEGRATED WELLNESS MANAGEMENT</small>
          </div>
        </Link>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#services">Our Services</a>
          <a href="#features">Features</a>
          <a href="#trainers">Trainers</a>
        </nav>

        <Link to="/login" className="login-button">
          Login / Sign Up
        </Link>
      </header>


      {/* ================= HERO ================= */}
      <main>

        <section className="hero" id="home">

          <div className="hero-left">

            <p className="hero-label">
              YOUR WELLNESS. YOUR JOURNEY.
            </p>

            <h1>
              Your Wellness
              <br />
              Deserves
              <br />
              <em>Better Care.</em>
            </h1>

            <p className="hero-description">
              Manage your fitness, appointments, trainers,
              memberships and wellness progress through one
              smart and secure platform designed around you.
            </p>

            <div className="hero-actions">

              <Link to="/login" className="primary-btn">
                Book Your Session
                <span>→</span>
              </Link>

              <a href="#services" className="outline-btn">
                Explore Services
                <span>→</span>
              </a>

            </div>

            <div className="trust-row">

              <div className="trust-item">
                <span>✓</span>
                Secure Access
              </div>

              <div className="trust-item">
                <span>✓</span>
                Easy Appointments
              </div>

              <div className="trust-item">
                <span>✓</span>
                Smart Search
              </div>

              <div className="trust-item">
                <span>✓</span>
                Progress Tracking
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-right">

            <div className="hero-image-area">

              <div className="soft-circle"></div>

              <div className="wellness-person">
                <div className="person-hair"></div>
                <div className="person-face"></div>
                <div className="person-body"></div>
              </div>


              {/* Circular service labels */}

              <div className="service-orbit orbit-one">
                <div className="orbit-image fitness">
                  💪
                </div>

                <span>
                  Fitness
                  <br />
                  Sessions
                </span>
              </div>

              <div className="service-orbit orbit-two">
                <div className="orbit-image yoga">
                  🧘
                </div>

                <span>
                  Yoga
                  <br />
                  Sessions
                </span>
              </div>

              <div className="service-orbit orbit-three">
                <div className="orbit-image nutrition">
                  🥗
                </div>

                <span>
                  Wellness
                  <br />
                  Programs
                </span>
              </div>

              <div className="service-orbit orbit-four">
                <div className="orbit-image progress">
                  📈
                </div>

                <span>
                  Progress
                  <br />
                  Tracking
                </span>
              </div>

            </div>

          </div>

        </section>


        {/* ================= STATS ================= */}

        <section className="stats-section">

          <div className="stat">
            <div className="stat-icon">♧</div>
            <strong>8+</strong>
            <span>Wellness Services</span>
          </div>

          <div className="stat">
            <div className="stat-icon">♙</div>
            <strong>Expert</strong>
            <span>Trainers</span>
          </div>

          <div className="stat">
            <div className="stat-icon">◷</div>
            <strong>Easy</strong>
            <span>Appointment Booking</span>
          </div>

          <div className="stat">
            <div className="stat-icon">⌕</div>
            <strong>AI-Powered</strong>
            <span>Wellness Search</span>
          </div>

          <div className="stat">
            <div className="stat-icon">↗</div>
            <strong>360°</strong>
            <span>Wellness Tracking</span>
          </div>

        </section>


        {/* ================= ABOUT ================= */}

        <section className="about-section" id="about">

          <div className="about-label">
            <span>01</span>
            ABOUT WELLNESS+
          </div>

          <div className="about-content">

            <h2>
              One platform for
              <br />
              your complete
              <br />
              <em>wellness journey.</em>
            </h2>

            <div className="about-text">

              <p>
                Wellness+ brings your fitness and wellness
                activities together in one integrated platform.
              </p>

              <p>
                From booking appointments and managing
                memberships to tracking attendance and
                progress, everything is available in one place.
              </p>

              <Link to="/login" className="text-link">
                Start your journey →
              </Link>

            </div>

          </div>

        </section>


        {/* ================= SERVICES ================= */}

        <section className="services-section" id="services">

          <div className="section-top">

            <div>
              <span className="section-number">02</span>

              <p className="section-label">
                OUR SERVICES
              </p>

              <h2>
                Wellness made
                <br />
                <em>simple.</em>
              </h2>
            </div>

            <p className="section-description">
              Access the services, trainers and wellness
              programs you need to support your goals.
            </p>

          </div>


          <div className="service-cards">

            <div className="service-card">
              <div className="card-number">01</div>

              <div className="large-card-icon">💪</div>

              <h3>Personal Fitness</h3>

              <p>
                One-to-one fitness training focused on
                strength, fitness and personal goals.
              </p>

              <a href="#services">Explore →</a>
            </div>


            <div className="service-card green-card">
              <div className="card-number">02</div>

              <div className="large-card-icon">🧘</div>

              <h3>Yoga & Relaxation</h3>

              <p>
                Sessions designed to improve flexibility,
                relaxation and overall wellbeing.
              </p>

              <a href="#services">Explore →</a>
            </div>


            <div className="service-card light-card">
              <div className="card-number">03</div>

              <div className="large-card-icon">🥗</div>

              <h3>Wellness Programs</h3>

              <p>
                Discover wellness content and programs
                aligned with your individual goals.
              </p>

              <a href="#services">Explore →</a>
            </div>

          </div>

        </section>


        {/* ================= FEATURES ================= */}

        <section className="features-section" id="features">

          <div className="features-heading">

            <span className="section-number">03</span>

            <p className="section-label">
              WHY WELLNESS+
            </p>

            <h2>
              Everything you need
              <br />
              to stay <em>well.</em>
            </h2>

          </div>


          <div className="feature-grid">

            <div className="feature">
              <span className="feature-icon">📅</span>
              <h3>Easy Appointments</h3>
              <p>
                Book and manage your wellness sessions
                with trainers.
              </p>
            </div>

            <div className="feature">
              <span className="feature-icon">🔐</span>
              <h3>Secure Access</h3>
              <p>
                Role-based authentication keeps your
                account protected.
              </p>
            </div>

            <div className="feature">
              <span className="feature-icon">📈</span>
              <h3>Progress Tracking</h3>
              <p>
                Monitor your wellness progress,
                attendance and goals.
              </p>
            </div>

            <div className="feature">
              <span className="feature-icon">🔎</span>
              <h3>Smart Wellness Search</h3>
              <p>
                Find relevant wellness content using
                semantic search.
              </p>
            </div>

            <div className="feature">
              <span className="feature-icon">💳</span>
              <h3>Membership Management</h3>
              <p>
                View and manage your wellness
                memberships and payments.
              </p>
            </div>

            <div className="feature">
              <span className="feature-icon">🔔</span>
              <h3>Instant Notifications</h3>
              <p>
                Receive important wellness updates
                and notifications.
              </p>
            </div>

          </div>

        </section>


        {/* ================= SMART SEARCH ================= */}

        <section className="smart-section">

          <div className="smart-left">

            <span className="section-number">04</span>

            <p className="section-label">
              INTELLIGENT WELLNESS SEARCH
            </p>

            <h2>
              Search by what
              <br />
              you <em>mean.</em>
            </h2>

            <p>
              Wellness+ uses semantic search to understand
              the meaning behind your query and find relevant
              wellness content.
            </p>

            <div className="example-query">
              <span>⌕</span>
              "I want something to help me lose fat"
            </div>

            <Link to="/login" className="primary-btn">
              Try Smart Search
              <span>→</span>
            </Link>

          </div>


          <div className="search-results">

            <div className="search-header">
              <span>Wellness Search</span>
              <span>AI powered</span>
            </div>

            <div className="result">
              <div className="result-icon">🏃</div>

              <div>
                <strong>Cardio Training for Fat Burning</strong>
                <span>Highly relevant result</span>
              </div>

              <b>49%</b>
            </div>

            <div className="result">
              <div className="result-icon">🥗</div>

              <div>
                <strong>Healthy Weight Management Diet</strong>
                <span>Relevant nutrition content</span>
              </div>

              <b>39%</b>
            </div>

            <div className="result">
              <div className="result-icon">💪</div>

              <div>
                <strong>Beginner Weight Loss Workout</strong>
                <span>Relevant fitness content</span>
              </div>

              <b>37%</b>
            </div>

          </div>

        </section>


        {/* ================= TRAINERS ================= */}

        <section className="trainers-section" id="trainers">

          <div className="section-top">

            <div>

              <span className="section-number">05</span>

              <p className="section-label">
                OUR TRAINERS
              </p>

              <h2>
                Guidance from
                <br />
                <em>experienced trainers.</em>
              </h2>

            </div>

            <p className="section-description">
              Connect with trainers and choose sessions
              that fit your wellness goals.
            </p>

          </div>


          <div className="trainer-grid">

            <div className="trainer-card">
              <div className="trainer-avatar avatar-one">
                PT
              </div>
              <h3>Personal Training</h3>
              <p>Fitness & Strength</p>
            </div>

            <div className="trainer-card">
              <div className="trainer-avatar avatar-two">
                YG
              </div>
              <h3>Yoga Training</h3>
              <p>Yoga & Relaxation</p>
            </div>

            <div className="trainer-card">
              <div className="trainer-avatar avatar-three">
                WT
              </div>
              <h3>Wellness Training</h3>
              <p>Health & Lifestyle</p>
            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="cta-section">

          <div>
            <span className="section-label">
              BEGIN YOUR JOURNEY
            </span>

            <h2>
              Take the first step
              <br />
              towards <em>better wellness.</em>
            </h2>

            <p>
              Join Wellness+ and manage your complete
              wellness journey from one place.
            </p>
          </div>

          <Link to="/login" className="cta-button">
            Login / Sign Up
            <span>→</span>
          </Link>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-brand">

          <Link to="/" className="brand">
            <div className="brand-logo">W</div>

            <div className="brand-name">
              Wellness<span>+</span>
            </div>
          </Link>

          <p>
            Integrated wellness management
            designed around your journey.
          </p>

        </div>


        <div className="footer-column">
          <h4>Explore</h4>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#features">Features</a>
        </div>


        <div className="footer-column">
          <h4>Platform</h4>
          <a href="#trainers">Trainers</a>
          <Link to="/login">Login</Link>
          <Link to="/login">Sign Up</Link>
        </div>


        <div className="footer-column">
          <h4>Technology</h4>
          <span>Smart Search</span>
          <span>Secure Authentication</span>
          <span>Progress Tracking</span>
        </div>

      </footer>


      <div className="copyright">
        © 2026 Wellness+ · Integrated Wellness Management System
      </div>

    </div>
  );
}

export default Home;