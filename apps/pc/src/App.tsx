import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import { LazyBuyIn } from './pages/BuyIn/lazy';
import InitialState from './pages/BuyIn/components/InitialState';
import WaitState from './pages/BuyIn/components/WaitState';
import EndState from './pages/BuyIn/components/EndState';
import Redirect from './components/Redirect';
// import { routes } from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/buyin" element={<LazyBuyIn />}>
          <Route path="prepare" element={<InitialState />} />
          {/* <Route path="prepare" element={<BuyInPrepare />} /> */}
          <Route path="playing" element={<WaitState />} />
          {/* <Route path="playing" element={<BuyInPlaying />} /> */}
          <Route path="settle" element={<EndState />} />
          {/* <Route path="settle" element={<BuyInSettle />} /> */}
          <Route path="*" element={<Redirect path="/buyin/prepare" />} />
        </Route>
        <Route path="*" element={<Redirect path="/" />} />

        {/* {routes.map((route) => (
          <Route key={route.name} path={route.path} element={route.element}>
            {route.children ? (
              <>
                {route.children.map((subRoute) => (
                  <Route
                    key={subRoute.name}
                    path={subRoute.path}
                    element={subRoute.element}
                  ></Route>
                ))}
              </>
            ) : null}
          </Route>
        ))} */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
