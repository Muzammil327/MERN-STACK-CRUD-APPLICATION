import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Update from "./pages/crud/[id]/page";
import Add from "./pages/crud/addCrud/page";
import Home from "./pages/crud/page";

import Register from "./pages/authentication/register/page";
import Login from "./pages/authentication/login/page";
import Profile from "./pages/authentication/profile/page";

// import { useContext } from "react";
// import { UserContext } from "./pages/authentication/context/userContext";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/crud/:id" element={<Update />}></Route>
          <Route path="/crud/add" element={<Add />}></Route>
          <Route path="/crud" element={<Home />}></Route>

          <Route path="/profile" element={<Profile />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />}></Route>
          {/* <Route path="/login" element={<Login />}></Route> */}
          {/* <Route path="/profile" element={<Profile />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
