import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    picture: "",
    isAdmin: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Registering user...");
      const response = await fetch("https://localhost:44316/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        alert("User registered successfully.");
        // Redirect to login or another page
        navigate("/");
      } else {
        alert(data || "Registration failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
      <img
            alt="Your Company"
            src="https://getlogo.net/wp-content/uploads/2020/04/bookmyshow-logo-vector.png"
            style={{ display: "block", margin: "0 auto", height: "50px", width: "100px" }}
          />
        <h2 style={styles.title}>Register Now</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="name" style={styles.label}>Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label htmlFor="email" style={styles.label}>Email address</label>
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
          <div style={styles.field}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label htmlFor="picture" style={styles.label}>Picture URL</label>
            <input
              id="picture"
              name="picture"
              type="text"
              value={formData.picture}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "10px" }}>
  <span style={styles.registerLink} onClick={() => navigate("/")}>LogIn</span>
</div>

        
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "60vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    padding: "20px",
  },
  formContainer: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    marginBottom: "5px",
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  fieldCheckbox: {
    display: "flex",
    alignItems: "center",
  },
  checkbox: {
    marginRight: "10px",
  },
  checkboxLabel: {
    fontSize: "14px",
    color: "#333",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4f46e5",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  registerLink: {
    color: "#4f46e5",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
    textAlign:"center"
  },
};
