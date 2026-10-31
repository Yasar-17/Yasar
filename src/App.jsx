import React from 'react';
import { PhoneProvider } from './context/PhoneContext';
import { PocketStudio } from './components/studio/PocketStudio';

export const App = () => {
  return (
    <PhoneProvider>
      <PocketStudio />
    </PhoneProvider>
  );
};

export default App;
