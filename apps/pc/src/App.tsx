import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { IS_DEV } from './common/env';
import { createLogger } from './common/commonLogger';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import GameDetail from './pages/GameDetail';
import HandCreate from './pages/GameDetail/hand/HandCreate';
import HandDetail from './pages/GameDetail/hand/HandDetail';
import BuyInCreate from './pages/GameDetail/buyin/BuyInCreate';
import RNG from './pages/Toolkits/RNG';
import { LazyDevTool } from './components/Devtool/lazy';
import Redirect from './components/Redirect';

const appLogger = createLogger('/App');

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 1. Login */}
          <Route path="/login" element={<LogIn />} />

          {/* 2. Home */}
          <Route path="/" element={<Home />} />

          {/* 2.1 GameDetail */}
          <Route path="/game/:gameId">
            <Route path="" element={<GameDetail />} />
            <Route path="hand/create" element={<HandCreate />} />
            <Route path="hand/:handId" element={<HandDetail />} />
            <Route path="buyin/create" element={<BuyInCreate />} />
          </Route>

          {/* 2.2 Statistic */}

          {/* 2.3 Toolkits */}
          <Route path="/toolkit">
            <Route path="rng" element={<RNG />} />
            <Route
              path="*"
              element={
                <Redirect
                  path="/?tab=Toolkits"
                  beforeRedirect={(path) => {
                    appLogger.warn(`unknown toolkit: ${path}, redirect to "/?tab=toolkits"`);
                  }}
                />
              }
            />
          </Route>

          {/* 2.4 Setting */}

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
      {IS_DEV && <LazyDevTool />}
    </>
  );
};

export default App;
