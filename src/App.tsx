import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Navigation } from './Components/Navigation';
// import { YMaps } from '@pbe/react-yandex-maps';

export const App = () => {

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <YMaps query={{ apikey: '0a62e602-e671-4320-a847-0c31041bdb2e' }}> */}
      <Navigation />
      {/* </YMaps> */}
    </React.Fragment>
  );
};
