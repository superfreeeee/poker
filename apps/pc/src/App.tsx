import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import { LazyBuyIn } from './pages/BuyIn/lazy';
import BuyInPrepare from './pages/BuyIn/components/BuyInPrepare';
import BuyInPlaying from './pages/BuyIn/components/BuyInPlaying';
import BuyInSettle from './pages/BuyIn/components/BuyInSettle';
import HandCreate from './pages/HandCreate';
import HandRecordList from './pages/HandRecordList';
import Redirect from './components/Redirect';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/buyin" element={<LazyBuyIn />}>
          {/* Edit => data */}
          <Route path="prepare" element={<BuyInPrepare />} />
          <Route path="playing" element={<BuyInPlaying />} />
          <Route path="settle" element={<BuyInSettle />} />
          {/* data => view: <BuyInPreview data={buyInRecord} /> */}
          {/* <Route path="preview" element={<div />} /> */}
          {/* default => view(recordList): <BuyInList /> */}
          {/* <Route path="" element={<div />} /> */}
          <Route path="" element={<Redirect path="/buyin/prepare" />} />
        </Route>
        {/* // TODO tmp page => move to sub page of GameDetail */}
        <Route path="/hand/create" element={<HandCreate />} />
        {/* // TODO tmp page => switch to GameList */}
        <Route path="/hands" element={<HandRecordList />} />
        <Route path="*" element={<Redirect path="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
