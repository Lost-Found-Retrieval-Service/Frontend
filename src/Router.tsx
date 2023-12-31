import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Lost from './pages/Lost';
import Detail from './pages/Detail';
import Found from './pages/Found';
import Search from './pages/Search';

const Router = () => {
  const routerData = [
    {
      path: '/',
      element: <Search />,
    },
    {
      path: '/lost',
      element: <Lost />,
    },
    {
      path: '/found',
      element: <Found />,
    },
    {
      path: '/detail',
      element: <Detail />,
    },
  ];

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routerData.map((data, i) => (
          <Route key={`route-${i}`} path={data.path} element={data.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
