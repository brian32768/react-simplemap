import React from 'react';
import MapPage from './map'

const App = () => {
  return (
    <div className="App">
    <MapPage style={{position:'absolute',top:0,width:600,height:400,padding:20}}/>
    </div>
  );
}

export default App;
