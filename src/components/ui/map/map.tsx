'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './map.module.css';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxProps { coordinates: LngLatLike; mpKey: string | undefined; }

const Mapbox: React.FC<MapboxProps> = ({ coordinates, mpKey }) => {

    const [ listings, setListings ] = useState([]);

    const mapContainerRef = useRef<HTMLDivElement>(null);

    mapboxgl.accessToken = mpKey;

    useEffect(() => {

        if(!mapContainerRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11', 
            center: coordinates,
            zoom: 12, 
        });

        map.resize()

        map.on('load', () => {

            map.addControl(new mapboxgl.NavigationControl(), 'right');

            // create a HTML element for each feature
            


        })
    
        return () => {

            map.remove()
        };

    }, []);

    return (
      <div id='main_map' className={styles.map} ref={mapContainerRef}>
    
      </div>
    )
}

export default Mapbox;

            // for(const feature of geojson.features){
            //     const el = document.createElement('div');
            //     el.className = styles.marker;
            //     el.innerHTML = '$40'

            //     new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);

            //     new mapboxgl.Marker(el)
            //     .setLngLat(feature.geometry.coordinates)
            //     .setPopup(
            //         new mapboxgl.Popup({ offset: 25 }) // add popups
            //         .setHTML(
            //             `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            //         )
            //     )
            //     .addTo(map);
            // }