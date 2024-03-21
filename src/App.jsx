import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Update from "./pages/[id]/page";
import Add from "./pages/addCrud/page";
import Home from "./pages/page";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Update />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
