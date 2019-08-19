import React, {useState} from 'react';
import {Map, OpenLayersVersion} from './map'
import {toLonLat} from 'ol/proj'
import './App.css'

const App = () => {
    const [pointer, setPointer] = useState();

    const handlePointer = (e) => {
        setPointer(toLonLat(e.coordinate));
        e.stopPropagation();
    }

    const handleMove = (e) => {
        console.log('move', e);
        return false;
    }

    return (
        <div className="App">
            <h1>react-simplemap</h1>
            {pointer}
            <h3><OpenLayersVersion/></h3>
            <Map center={[-122.6, 45.5]} zoom={10} onMoveEnd={handleMove} onPointerMove={handlePointer}
                className="simplemap"/>

                Simple <a href="https://reactjs.org">React</a> app to demonstrate a map
                using <a href="https://openlayers.org">OpenLayers</a> and <a href="https://openstreetmap.org">OpenStreetMap</a>
            <br />
                Add it to your own project with <b>npm install @map46/react-simplemap</b>

        </div>
    );
}

export default App;
