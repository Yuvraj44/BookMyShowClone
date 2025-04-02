import { useState } from "react";
import { Button } from "react-bootstrap";

function Counter({ availableSeats, price, onCountChange }) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    if (count < availableSeats) {
      setCount(count + 1);
      onCountChange(count + 1);
    }
    else
    {
      alert('No more seats available.')
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      onCountChange(count - 1);
    }
  };

  return (
    <div className="d-flex align-items-center gap-3">
      <Button variant="danger" onClick={handleDecrement}>-</Button>
      <span>{count}</span>
      <Button variant="success" onClick={handleIncrement}>+</Button>
    </div>
  );
}

export default Counter;
