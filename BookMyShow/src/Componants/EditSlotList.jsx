import EditSlot from "./EditSlot";

const EditSlotList = ({ slots }) => {
  if (slots.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
        <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>No slots are available.</p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {slots.map((slot) => (
        <EditSlot key={slot.slotId} slot={slot} />
      ))}
    </div>
  );
};

export default EditSlotList;
