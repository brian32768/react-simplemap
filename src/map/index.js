import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import olMap from 'ol/map'
import View from 'ol/view'
import {Tile} from 'ol/layer'
import {OSM} from 'ol/source'

const Map = (props) => {
    const [theMap] = useState(new olMap({
        view: new View({center: [0,0], zoom: 4}),
        layers: [new Tile({source: new OSM()})]
    }));
    const mapTarget = element => {theMap.setTarget(element)}
    return (
        <>
            <div ref={mapTarget} style={props.style}></div>
        </>
    );
}
export default Map
