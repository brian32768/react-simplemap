import React, {useState, useEffect} from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'

import olMap from 'ol/map'
import Collection from 'ol/Collection'
import {fromLonLat} from 'ol/proj'
import View from 'ol/view'
import LayerGroup from 'ol/layer/Group'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Stamen from 'ol/source/Stamen'
import olextLayerSwitcher from 'ol-ext/control/LayerSwitcher'
import 'ol-ext/dist/ol-ext.css'

export {default as OpenLayersVersion} from './ol-version'

const Map = ({className, center, zoom, onMoveEnd, onPointerMove}) => {
    const [map] = useState(() => {
        const stamenLayers = new Collection([
            new TileLayer({
                title: "Stamen Watercolor",
                source: new Stamen({layer:"watercolor"}),
            }),
            new TileLayer({
                title: "Stamen Toner",
                source: new Stamen({layer:"toner"})
            }),
        ]);
        const layerCollection = new Collection([
            new LayerGroup({
                title: "Stamen",
                openInLayerSwitcher: true,
                layers: stamenLayers,
            }),
            new TileLayer({title: "OpenStreetMap", source: new OSM()})
        ]);
        return new olMap({
            view: new View({
                center: fromLonLat(center),
                zoom: zoom
            }),
            layers: layerCollection,
            controls: [
                new olextLayerSwitcher()
            ]
        })
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
