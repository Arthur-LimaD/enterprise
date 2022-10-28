import React, {useState} from 'react';
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Presentation from './components/pages/Presentation';
import NewCompany from './components/pages/NewCompany';
import Company from './components/pages/Company';
import CompanyFinancial from './components/pages/CompanyFinancial';

function App() {

  return (<>
      <Router>
          <Navbar/>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/AboutUs" element={<Presentation/>}/>
              <Route path="/company/:id" element={<Company/>}/>
              <Route path="/company/:id/financial" element={<CompanyFinancial/>}/>
              <Route path="/NewCompany" element={<NewCompany/>}/>
              <Route exact path="/" element={<Home/>}/>
            </Routes>


        
      </Router>
    </>
    );
}

export default App;
