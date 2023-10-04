import './App.css';
import CovidMap from './components/CovidMap';
import MenuBar from './components/MenuBar';
import * as React from 'react';

function App() {


  return (
    <div className="App">
      <MenuBar />
      <CovidMap />
    </div>
  );
}

export default App;
