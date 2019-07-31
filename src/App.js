import React from 'react';
import Map from './map'

const App = () => {
  return (
    <div className="App">
    <h1>react-simplemap</h1>
    <Map style={{position:'relative',top:0,width:600,height:400,padding:10}}/>

    <p>
        Very simple <a href="https://reactjs.org">React</a> app to demonstrate a map
        using <a href="https://openlayers.org">OpenLayers</a> and <a href="https://openstreetmap.org">OpenStreetMap</a>
    </p><p>
        Add it to your own project with <b>npm install @map46/react-simplemap</b>
    </p>
    </div>
  );
}

export default App;
