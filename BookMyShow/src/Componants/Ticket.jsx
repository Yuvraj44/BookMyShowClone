import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Ticket = () => {
  const location = useLocation();
  const { ticket } = location.state || {};

  if (!ticket) return <h2>No ticket found!</h2>;

  const downloadTicket = () => {
    const input = document.getElementById("ticket");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("ticket.pdf");
    });
  };

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

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <style>
        {`
          .ticket-container {
            width: 350px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            padding: 20px;
            font-family: Arial, sans-serif;
            text-align: left;
            margin: auto;
          }
          .ticket-header {
            background: #6a1b9a;
            color: white;
            text-align: center;
            padding: 10px;
            font-weight: bold;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
          .ticket-content {
            padding: 15px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          .info-label {
            font-weight: bold;
          }
          .ticket-footer {
            text-align: center;
            padding-top: 10px;
            border-top: 1px dashed gray;
            margin-top: 10px;
          }
          .download-btn {
            width: 100%;
            padding: 10px;
            margin-top: 15px;
            background: #6a1b9a;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
          }
          .download-btn:hover {
            background: #501778;
          }
          .movie-name {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
          }
          .cinema-hall {
            text-align: right;
          }
        `}
      </style>

      <div className="ticket-container" id="ticket">
        <div className="ticket-header">MOVIE TICKET</div>
        <div className="ticket-content">
          <h3 className="movie-name">{ticket.movieName}</h3>
          <div className="info-row">
            <span className="info-label">Date:</span>
            <span className="info-value">{formatDate(ticket.date)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Time:</span>
            <span className="info-value">{formatTime(ticket.time)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Seat:</span>
            <span className="info-value">{ticket.seats}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Customer:</span>
            <span className="info-value">{ticket.customerName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Location:</span>
            <span className="info-value cinema-hall">{ticket.cinemaHall}</span>
          </div>
        </div>
        <button onClick={downloadTicket} className="download-btn">Download Ticket</button>
      </div>
    </div>
  );
};

export default Ticket;
