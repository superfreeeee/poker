import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import { LazyBuyIn } from './pages/BuyIn/lazy';
import GameDetail from './pages/GameDetail';
import HandCreate from './pages/GameDetail/HandCreate';
import HandDetail from './pages/GameDetail/HandDetail';
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
        {/* 1. Login */}
        <Route path="/login" element={<LogIn />} />

        {/* 2. GameList / Statistic / Setting */}
        <Route path="/" element={<Home />} />

        {/* 2.1 GameDetail */}
        <Route path="/game/:gameId">
          <Route path="" element={<GameDetail />} />
          <Route path="hand/create" element={<HandCreate />} />
          <Route path="hand/:handId" element={<HandDetail />} />
          <Route path="buyin/create" element={<BuyInCreate />} />
        </Route>

        {/* 2.2 Statistic */}
        {/* 2.3 Utils */}
        <Route path="/rng" element={<RNG />} />

        {/* 2.4 Setting */}

        {/* // TODO move to game detail page */}
        <Route path="/buyin" element={<LazyBuyIn />}>
          <Route path="detail/:id" element={<BuyInView />} />
          <Route path="create" element={<BuyInCreate />} />
          <Route path="" element={<Redirect path="/buyin/create" />} />
        </Route>

        {/* default: redirect to Home */}
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
