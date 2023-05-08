import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
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
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
