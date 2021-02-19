import React, {useState, useEffect} from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import olMap from 'ol/map'
import {fromLonLat} from 'ol/proj'
import olextLayerSwitcher from 'ol-ext/control/LayerSwitcher'
import View from 'ol/view'
import 'ol-ext/dist/ol-ext.css'

const aptiler_key = 'aK1gFbdO9eY4m5n5zuPn'
import apply from 'ol-mapbox-style'

export {default as OpenLayersVersion} from './ol-version'

const Map = ({className, center, zoom, onMoveEnd, onPointerMove}) => {
    const [map] = useState(() => {

        const map = new olMap({
            view: new View({
                center: fromLonLat(center),
                zoom: zoom
            }),
        })
        apply(
            map,
            'https://api.maptiler.com/maps/topo/style.json?key=' + aptiler_key
        ).then(function (map) {
            map.addControl(new olextLayerSwitcher())
        });
        return map
    })

    const mapTarget = element => {map.setTarget(element)}
    useEffect(() => {
        if (typeof onMoveEnd === 'function') map.on('moveend', onMoveEnd);
        if (typeof onPointerMove === 'function') map.on('pointermove', onPointerMove);
    });
    return (
        <>
            <div ref={mapTarget} className={className}></div>
        </>
    );
}
Map.propTypes = {
    className: PropTypes.string,
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    onMoveEnd: PropTypes.func,
    onPointerMove: PropTypes.func,
}
export default Map
