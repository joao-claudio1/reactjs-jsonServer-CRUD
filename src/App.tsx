import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import Home from './pages/Home';
import Editar from "./pages/Editar";


import {Link, Route, Routes, BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/editar/:id" element={<Editar/>} />
      </Routes>
    </div>);
}
export default App;
