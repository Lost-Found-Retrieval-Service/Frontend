import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import List from './pages/List';

const Router = () => {
  const routerData = [
    {
      path: '/list',
      element: <List />,
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
