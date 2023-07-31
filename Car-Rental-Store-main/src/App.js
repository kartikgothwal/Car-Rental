import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import TestimonialComponent from "./component//TestimonialComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VehicalModels from "./component/VehicalModels";
import Login from "./component/LoginRegistration/Login";
import Registration from "./component/LoginRegistration/Registration";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          {/* <Route exact path="/about" element={<About />} /> */}
          <Route exact path="/testimonial" element={<TestimonialComponent />} />
          <Route exact path="/vehicalsmodels" element={<VehicalModels />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
