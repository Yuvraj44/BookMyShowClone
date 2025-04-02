import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerRoutes from "./CustomerRoutes"; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
