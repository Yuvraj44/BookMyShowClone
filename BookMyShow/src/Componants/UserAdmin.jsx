import React, { useEffect, useState } from "react";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://localhost:44316/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const toggleAdmin = async (id, isAdmin) => {
    try {
      const response = await fetch(`https://localhost:44316/toogleAdmin/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === id ? { ...user, isAdmin: !user.isAdmin } : user
          )
        );
        alert(
            isAdmin
              ? "Admin rights have been revoked."
              : "The user is now an Admin."
          );
        
      } else {
        console.error("Failed to toggle admin status");
      }
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      {users.map((user) => (
        <div
          key={user.userId}
          style={{
            width: "100%",
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: "bold" }}>
              {user.userName}
            </h3>
            <p style={{ margin: "0" }}>{user.email}</p>
          </div>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: user.isAdmin ? "red" : "green",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => toggleAdmin(user.userId, user.isAdmin)}
          >
            {user.isAdmin ? "Revoke Admin" : "Make Admin"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserAdmin;