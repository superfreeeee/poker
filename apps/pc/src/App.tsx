import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Redirect from './components/Redirect';
import styles from './index.module.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<Redirect path="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
