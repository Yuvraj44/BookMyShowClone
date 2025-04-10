import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const History = () => {
  const { state } = useLocation();
  const [bookings, setBookings] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        const response = await fetch(`https://localhost:44316/api/bookings/${user?.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const fetchSlotDetails = async (slotId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://localhost:44316/api/slot/${slotId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      
      
      if (response.ok) {
        const data = await response.json();
        setSelectedSlot(data);
        setModalOpen(true);
      } else {
        console.error("Failed to fetch slot details");
      }
    } catch (error) {
      console.error("Error fetching slot details:", error);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      {bookings.map((booking) => (
        <div key={booking.bookingId} style={{ width: "100%", padding: "16px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: "bold" }}>Booking ID: {booking.bookingId}</h3>
            <p style={{ margin: "0" }}>Tickets: {booking.tickets}</p>
          </div>
          <button
            style={{ padding: "8px 16px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginLeft: "auto" }}
            onClick={() => fetchSlotDetails(booking.showId)}
          >
            View Details
          </button>
        </div>
      ))}

      {modalOpen && selectedSlot && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", width: "350px", position: "relative" }}>
            <button
              style={{ position: "absolute", top: "8px", right: "8px", background: "none", border: "none", fontSize: "16px", cursor: "pointer" }}
              onClick={() => setModalOpen(false)}
            >
              ✖
            </button>
            <h2 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "bold" }}>Slot Details</h2>
            <p><strong>Movie:</strong> {selectedSlot.movieName}</p>
            <p><strong>Cinema Hall:</strong> {selectedSlot.cinemaHall}</p>
            <p><strong>Date:</strong> {formatDate(selectedSlot.date)}</p>
            <p><strong>Time:</strong> {formatTime(selectedSlot.timing)}</p>
            <p><strong>Price:</strong> ₹{selectedSlot.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;