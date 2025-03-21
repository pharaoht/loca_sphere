'use client'
import { useEffect } from 'react';
import styles from './map.module.css';
import mapboxgl from 'mapbox-gl';

interface MapboxProps {
    coordinates: Array<{}>
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Mapbox: React.FC<MapboxProps> = ({ coordinates }) => {


    useEffect(() => {

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', 
            center: [12.4924, 41.8902],
            zoom: 12, 
        });
    
        return () => {
            map.remove()
        };

    }, []);

    return (
        <div className={styles.map} id='map'>

        </div>
    )
}

export default Mapbox;