import Slot from "./Slot";

const SlotList = ({slots}) => {

    if (slots.length === 0) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>No slots are available.</p>
            </div>
        );
    }


    return (
        <div>
            {slots.map((slot) => (
                <Slot slot={slot} />
            ))}
        </div>
    );
};

export default SlotList;
