import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import { LazyBuyIn } from './pages/BuyIn/lazy';
import HandCreate from './pages/GameDetail/HandCreate';
import HandDetail from './pages/HandDetail';
import GameDetail from './pages/GameDetail';
import BuyInCreate from './pages/BuyIn/BuyInCreate';
import BuyInView from './pages/BuyIn/BuyInView';
import RNG from './pages/RNG';
import Redirect from './components/Redirect';
import { createLogger } from './common/commonLogger';

const appLogger = createLogger('/App');

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
        <Route path="/hand/:handId" element={<HandDetail />} />
        <Route path="/game/:gameId">
          <Route path="" element={<GameDetail />} />
          <Route path="hand/create" element={<HandCreate />} />
        </Route>
        <Route path="/rng" element={<RNG />} />
        <Route
          path="*"
          element={
            <Redirect
              path="/"
              beforeRedirect={(path) => {
                appLogger.warn(`unknown path: ${path}, redirect to "/"`);
              }}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
