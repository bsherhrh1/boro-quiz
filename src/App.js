import React from 'react';
import './App.css';

import Widget from './components/Widget'

export const actions={
  countIncrement: 'increment',
  decrement: 'DECREMENT',

}

function App() {
  return (
      <Widget/>
  );
}

export default App;
