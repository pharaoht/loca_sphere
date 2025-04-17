'use client'
import { useEffect, useRef } from 'react';
import styles from './map.module.css';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapboxProps { coordinates: LngLatLike; mpKey: string | undefined; }
interface GeoJSON { type: 'FeatureCollection'; features: Feature[]; }
interface Feature { type: 'Feature'; geometry: Geometry; properties: Properties; }
interface Geometry { type: 'Point'; coordinates: [number, number]; }
interface Properties { title: string; description: string; }

const geojson: GeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
        },
        properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
        }
      }
    ]
  };

const Mapbox: React.FC<MapboxProps> = ({ coordinates, mpKey }) => {

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
            
            for(const feature of geojson.features){
                const el = document.createElement('div');
                el.className = styles.marker;
                el.innerHTML = '$40'

                new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);

                new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                    )
                )
                .addTo(map);
            }

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