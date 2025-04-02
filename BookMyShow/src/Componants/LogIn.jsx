import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Fetching...");
      const response = await fetch("https://localhost:44316/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (data.success) {
        alert("Logged IN");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/api/home");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.textCenter}>
          <img
            alt="Your Company"
            src="https://getlogo.net/wp-content/uploads/2020/04/bookmyshow-logo-vector.png"
            style={{ display: "block", margin: "0 auto", height: "50px", width: "100px" }}
          />
          <h2 style={styles.title}>Sign in to your account</h2>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label htmlFor="email" style={styles.label}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>Sign in</button>
        </form>

        <p style={styles.registerText}>
          Don't have an account? <span style={styles.registerLink} onClick={() => navigate("/api/register")}>Register Now</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    padding: "12px",
  },
  formContainer: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  textCenter: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
  registerText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#333",
  },
  registerLink: {
    color: "#4f46e5",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  },
};