import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateMovie() {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    genre: "",
    duration: "",
    description: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Creating movie...");
      const response = await fetch("https://localhost:44316/api/movies/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        alert("Movie created successfully.");
        navigate("/api/home");
      } else {
        alert(data || "Movie creation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the movie.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Create Movie</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label htmlFor="title" style={styles.label}>Title</label>
            <input id="title" name="title" type="text" required value={formData.title} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.field}>
            <label htmlFor="imageUrl" style={styles.label}>Image URL</label>
            <input id="imageUrl" name="imageUrl" type="text" required value={formData.imageUrl} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.field}>
            <label htmlFor="genre" style={styles.label}>Genre</label>
            <select id="genre" name="genre" value={formData.genre} onChange={handleChange} style={styles.input}>
              <option value="Horror">Horror</option>
              <option value="Drama">Drama</option>
              <option value="Anime">Anime</option>
              <option value="SciFi">SciFi</option>
            </select>
          </div>
          <div style={styles.field}>
            <label htmlFor="duration" style={styles.label}>Duration</label>
            <input id="duration" name="duration" type="text" required value={formData.duration} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.field}>
            <label htmlFor="description" style={styles.label}>Description</label>
            <textarea id="description" name="description" required value={formData.description} onChange={handleChange} style={styles.input}></textarea>
          </div>
          <button type="submit" style={styles.button}>Create Movie</button>
        </form>
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
};
