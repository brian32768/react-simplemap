import React, {useState, useEffect} from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import olMap from 'ol/map'
import {fromLonLat} from 'ol/proj'
import View from 'ol/view'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

export {default as OpenLayersVersion} from './ol-version'

const Map = ({center, zoom, onMoveEnd, onPointerMove, style}) => {
    const [map] = useState(new olMap({
        view: new View({
            center: fromLonLat(center),
            zoom: zoom
        }),
        layers: [new TileLayer({source: new OSM()})]
    }));
    const mapTarget = element => {map.setTarget(element)}
    useEffect(() => {
        if (typeof onMoveEnd === 'function') map.on('moveend', onMoveEnd);
        if (typeof onPointerMove === 'function') map.on('pointermove', onPointerMove);
    });
    return (
        <>
            <div ref={mapTarget} style={style}></div>
        </>
    );
}
Map.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    onMoveEnd: PropTypes.func,
    onPointerMove: PropTypes.func,
    style: PropTypes.object
}
export default Map
