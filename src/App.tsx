import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import SalesTable from "./components/Sales/SalesTable";
import { Toaster } from "./components/ui/toaster";
import AddNewSaleForm from "./components/Sales/AddNewSaleForm";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<SalesTable />} />
        <Route path="/add-new-sale" element={<AddNewSaleForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
