import './App.css';
import CovidMap from './components/CovidMap';
import MenuBar from './components/MenuBar';
import * as React from 'react';

function App() {

  const [apiKey, setApiKey] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const googleMapApiKey = React.useRef();


  return (
    <div className="App">
      <MenuBar handleApikey={setApiKey} getApiKey={apiKey} googleMapApiKeyMB={googleMapApiKey} />
      <CovidMap getApiKey={apiKey} />
    </div>
  );
}

export default App;
