import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import { LazyBuyIn } from './pages/BuyIn/lazy';
import HandCreate from './pages/HandCreate';
import HandRecordList from './pages/HandRecordList';
import HandDetail from './pages/HandDetail';
import RNG from './pages/RNG';
import Redirect from './components/Redirect';
import BuyInCreate from './pages/BuyIn/BuyInCreate';
import BuyInView from './pages/BuyIn/BuyInView';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/buyin" element={<LazyBuyIn />}>
          <Route path="detail" element={<BuyInView />} />
          <Route path="create" element={<BuyInCreate />} />
          <Route path="" element={<Redirect path="/buyin/create" />} />
        </Route>
        {/* // TODO tmp page => move to sub page of GameDetail */}
        <Route path="/hand/create" element={<HandCreate />} />
        {/* // TODO tmp page => switch to GameList */}
        <Route path="/hands" element={<HandRecordList />} />
        <Route path="/hand/:handId" element={<HandDetail />} />
        <Route path="/rng" element={<RNG />} />
        <Route path="*" element={<Redirect path="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
