import React, { useEffect } from 'react';
import './App.css';
import Router from './Router';
import GlobalStyle from './styles/GlobalStyle';
import IsLostProvider from './providers/IsLostProvider';

function App() {
  useEffect(() => {
    const clientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}&submodules=geocoder`;
    document.head.appendChild(script);

    return () => {
      // 컴포넌트가 언마운트될 때 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div>
      <GlobalStyle />
      <IsLostProvider>
        <Router />
      </IsLostProvider>
    </div>
  );
}

export default App;
