import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

import olMap from 'ol/map'
import {fromLonLat} from 'ol/proj'
import View from 'ol/view'
import {Tile} from 'ol/layer'
import {OSM} from 'ol/source'

const Map = (props) => {
    const [theMap] = useState(new olMap({
        view: new View({
            center: fromLonLat([props.lon, props.lat]),
            zoom: props.zoom
        }),
        layers: [new Tile({source: new OSM()})]
    }));
    const mapTarget = element => {theMap.setTarget(element)}
    return (
        <>
            <div ref={mapTarget} style={props.style}></div>
        </>
    );
}
Map.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number
}
export default Map
