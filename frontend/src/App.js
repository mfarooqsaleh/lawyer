import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import RegisterScreen from "./RegisterScreen/RegisterScreen.js";

import LoginScreen from "./LoginScreen/LoginScreen.js";
import Header from "./Header/Header.js";




function App() {
  return (
    <div>
    <Router>
    <Routes>
      <Route exact path="/" element={<Header />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Routes>


     </Router>
     </div>
  );
}

export default App;
