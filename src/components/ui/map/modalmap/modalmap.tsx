'use client'
import React, { useEffect, useRef } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from "mapbox-gl";

interface MapDisplayProps {
    longitude: number;
    latitude: number;
    zoom?: number;
    token: string;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ longitude, latitude, zoom = 12, token }) => {
    console.log(token)
    if (!token) return 'hii';

    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {

        if (mapRef.current) return; // initialize map only once

        mapboxgl.accessToken = token;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current!,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [longitude, latitude],
            zoom,
        });

        // Add a marker
        new mapboxgl.Marker({ color: "blue" })
            .setLngLat([longitude, latitude])
            .addTo(mapRef.current);

        return () => {
            mapRef.current?.remove();
        };

    }, [latitude, longitude, zoom]);

    return (
        <div
            ref={mapContainerRef}
            style={{
                width: "100%",
                height: "400px", 
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#eaeaea",
            }}
        />
    );
};


export default MapDisplay;