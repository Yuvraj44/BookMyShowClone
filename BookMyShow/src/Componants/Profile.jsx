const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user")) ;
  
    return (
        <div style={styles.container}>
          <img src={user.picture} alt={user.name} style={styles.picture} />
          <h2 style={styles.name}>{user.name}</h2>
          <p style={styles.email}>{user.email}</p>
          <p style={styles.admin}>Admin: {user.isAdmin ? "Yes" : "No"}</p>
        </div>
      );
    };
    
    const styles = {
      container: {
        padding: "16px",
        maxWidth: "100%",
        height:"400px",
        margin: "auto",
        background: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        textAlign: "center"
      },
      picture: {
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        display: "block",
        margin: "0 auto"
      },
      name: {
        fontSize: "1.25rem",
        fontWeight: "bold",
        marginTop: "8px"
      },
      email: {
        color: "gray"
      },
      admin: {
        color: "darkgray"
      }
    };
    
    export default Profile;
    
  