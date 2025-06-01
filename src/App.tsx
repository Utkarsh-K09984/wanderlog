import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./NavBar/navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login"
import Journal from "./pages/Journal";
import CreateJournal from "./pages/CreateJournal.tsx";
import ContactUs from "./pages/ContactUs";
import { FootballIcon } from "hugeicons-react";
import Footer from "./NavBar/footer.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* Protected Routes Placeholder */}
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/create" element={<CreateJournal />} />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
