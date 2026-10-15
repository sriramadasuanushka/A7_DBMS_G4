import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  // ==========================================
  // LOGIN / SIGNUP
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password confirmation during signup
    if (
      !isLogin &&
      form.password !== form.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    try {

      const endpoint = isLogin
        ? "http://localhost:8090/api/auth/login"
        : "http://localhost:8090/api/auth/register";


      const body = isLogin
        ? {
            username: form.username,
            password: form.password
          }
        : {
            username: form.username,
            email: form.email,
            password: form.password,
            name: form.name
          };


      const response = await fetch(endpoint, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(body)
      });


      // Login returns JWT as plain text.
      // Signup returns JSON.

      const data = isLogin
        ? await response.text()
        : await response.json();


      // ==========================================
      // HANDLE BACKEND ERRORS
      // ==========================================

      if (!response.ok) {

        let errorMessage =
          "Authentication failed.";


        if (typeof data === "string") {

          errorMessage =
            data || errorMessage;

        } else if (data?.message) {

          errorMessage =
            data.message;

        }


        alert(errorMessage);

        return;
      }


      // ==========================================
      // LOGIN SUCCESS
      // ==========================================

      if (isLogin) {

        // Store JWT
        localStorage.setItem(
          "token",
          data
        );


        alert("Login successful!");


        console.log(
          "JWT received successfully"
        );

        console.log(
          "Token stored in localStorage."
        );


        // Go to Dashboard
        navigate("/dashboard");

      }


      // ==========================================
      // SIGNUP SUCCESS
      // ==========================================

      else {

        alert(
          "Account created successfully! Please login."
        );


        setIsLogin(true);


        setForm({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        });

      }

    } catch (error) {

      console.error(
        "Authentication error:",
        error
      );

      alert(
        "Cannot connect to the backend."
      );
    }
  };


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="auth-page">


      {/* ======================================
          LEFT VISUAL SECTION
      ====================================== */}

      <div className="auth-visual">


        {/* BRAND */}

        <div className="auth-brand">

          <div className="auth-logo">
            W
          </div>


          <div>

            <strong>
              Wellness<span>+</span>
            </strong>


            <small>
              INTEGRATED WELLNESS MANAGEMENT
            </small>

          </div>

        </div>


        {/* MESSAGE */}

        <div className="auth-message">

          <span>
            YOUR WELLNESS JOURNEY
          </span>


          <h1>
            Take care of
            <br />
            <em>yourself.</em>
          </h1>


          <p>
            Connect with your wellness services,
            manage appointments, track progress,
            and discover content designed around you.
          </p>

        </div>


        {/* DECORATIVE CIRCLE */}

        <div className="auth-circle">

          <div className="auth-person">

            <div className="auth-head"></div>

            <div className="auth-body"></div>

          </div>

        </div>

      </div>


      {/* ======================================
          RIGHT AUTHENTICATION SECTION
      ====================================== */}

      <div className="auth-container">

        <div className="auth-card">


          {/* ==================================
              BACK TO HOME
          ================================== */}

          <button
            type="button"
            className="back-home-btn"
            onClick={() => navigate("/")}
          >
            <span>←</span>
            Back to Home
          </button>


          {/* ==================================
              MOBILE BRAND
          ================================== */}

          <div className="mobile-brand">

            <div className="auth-logo">
              W
            </div>


            <strong>
              Wellness<span>+</span>
            </strong>

          </div>


          {/* ==================================
              LOGIN / SIGNUP TABS
          ================================== */}

          <div className="auth-tabs">

            <button
              className={
                isLogin ? "active" : ""
              }
              onClick={() =>
                setIsLogin(true)
              }
              type="button"
            >
              Login
            </button>


            <button
              className={
                !isLogin ? "active" : ""
              }
              onClick={() =>
                setIsLogin(false)
              }
              type="button"
            >
              Sign Up
            </button>

          </div>


          {/* ==================================
              HEADING
          ================================== */}

          <div className="auth-heading">

            <h2>
              {
                isLogin
                  ? "Welcome back."
                  : "Create your account."
              }
            </h2>


            <p>
              {
                isLogin
                  ? "Sign in to continue your wellness journey."
                  : "Join Wellness+ and start your wellness journey today."
              }
            </p>

          </div>


          {/* ==================================
              AUTHENTICATION FORM
          ================================== */}

          <form onSubmit={handleSubmit}>


            {/* FULL NAME - SIGNUP ONLY */}

            {!isLogin && (

              <div className="field">

                <label>
                  Full Name
                </label>


                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />

              </div>

            )}


            {/* USERNAME */}

            <div className="field">

              <label>
                Username
              </label>


              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                required
              />

            </div>


            {/* EMAIL - SIGNUP ONLY */}

            {!isLogin && (

              <div className="field">

                <label>
                  Email Address
                </label>


                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

              </div>

            )}


            {/* PASSWORD */}

            <div className="field">

              <div className="field-label-row">

                <label>
                  Password
                </label>


                {isLogin && (

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() =>
                      alert(
                        "Please contact the administrator to reset your password."
                      )
                    }
                  >
                    Forgot password?
                  </button>

                )}

              </div>


              <div className="password-input">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {
                    showPassword
                      ? "Hide"
                      : "Show"
                  }
                </button>

              </div>

            </div>


            {/* CONFIRM PASSWORD - SIGNUP ONLY */}

            {!isLogin && (

              <div className="field">

                <label>
                  Confirm Password
                </label>


                <div className="password-input">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={
                      form.confirmPassword
                    }
                    onChange={handleChange}
                    required
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                  >
                    {
                      showConfirmPassword
                        ? "Hide"
                        : "Show"
                    }
                  </button>

                </div>

              </div>

            )}


            {/* REMEMBER ME */}

            {isLogin && (

              <div className="remember-row">

                <label>

                  <input
                    type="checkbox"
                  />

                  <span>
                    Remember me
                  </span>

                </label>

              </div>

            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-submit"
            >

              {
                isLogin
                  ? "Login"
                  : "Create Account"
              }

              <span>
                →
              </span>

            </button>

          </form>


          {/* ==================================
              SWITCH LOGIN / SIGNUP
          ================================== */}

          <div className="switch-account">

            {isLogin ? (

              <>

                Don't have an account?


                <button
                  type="button"
                  onClick={() =>
                    setIsLogin(false)
                  }
                >
                  Sign up
                </button>

              </>

            ) : (

              <>

                Already have an account?


                <button
                  type="button"
                  onClick={() =>
                    setIsLogin(true)
                  }
                >
                  Login
                </button>

              </>

            )}

          </div>


          {/* ==================================
              SECURITY MESSAGE
          ================================== */}

          <div className="secure-note">

            🔒 Secure authentication powered by JWT

          </div>


        </div>

      </div>

    </div>
  );
}

export default Login;