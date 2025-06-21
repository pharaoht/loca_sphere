'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './map.module.css';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useHttp from '@/hooks/useHttp';
import useParams from '@/hooks/useParams';
import ReactDOMServer from 'react-dom/server';
import PopupContent from './popup/popup';

export type Currency = {
	id: string;
	code: string;
	symbol: string;
};

export type List = {
	id: string;
	userId: string;
	title: string;
	monthlyRent: string;
	currencyId: string;
	description: string;
	bedrooms: number;
	beds: number;
	bathrooms: number;
	roomAreaSqm: number;
	placeAreaSqm: number;
	minimumStayDays: number;
	maxStayDays: number;
	listingTypeId: string;
	isChecked: boolean;
	createdAt: string;
	updatedAt: string; 
	currency: Currency;
};

export type Address = {
	id: string;
	listingId: string;
	streetAddress: string;
	houseNumber: string;
	postalCode: string;
	city: string;
	stateOrProvince: string;
	countryCode: string;
	latitude: number;
	longitude: number;
	extraInfo: string;
	listing: List;
};


interface MapboxProps { coordinates: LngLatLike; mpKey: string | undefined; }

const Mapbox: React.FC<MapboxProps> = ({ coordinates, mpKey }) => {

    mapboxgl.accessToken = mpKey;

    const [ listings, setListings ] = useState<Address[]>([]);

    const { getParam, setParam } = useParams();

    const { sendRequest, isLoading, error } = useHttp();

    const lat = getParam('lat') || 0;

    const long = getParam('long') || 0;

    const mapContainerRef = useRef<HTMLDivElement>(null);

    const mapRef = useRef<mapboxgl.Map | null>(null);

    const mapMarkerRef = useRef(new Map());

    const getListings = async () => {
        
        const reqObj = {
            url: `listings/address/coordinates?lat=${lat}&long=${long}`,
            method: 'GET'
        };

        const d = await sendRequest({
            requestConfig: reqObj,
            callback: setListings
        });

        return d;

    };

    useEffect(() => {

        if (!mapContainerRef.current) return;

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: coordinates,
          zoom: 11.5,
        });

        mapRef.current.on('moveend', () => {

            const { lng, lat } = mapRef.current!.getCenter();
       
            setParam([
                { key: 'long', value: String(lng)},
                { key: 'lat', value: String(lat)}
            ]);
        });
    

        return () => {
            
            mapRef.current!.remove();
        };
    
    }, []);

    useEffect(() => {

        if (!mapRef.current) return;
        
        listings.forEach((itm) => {
    
            if(mapMarkerRef.current.has(itm.id)) return null;

            const el = document.createElement('div');

            el.className = styles.marker;
            el.innerHTML = `${itm.listing.currency.symbol} ${itm?.listing?.monthlyRent}` || '';
        
            const htmlString = ReactDOMServer.renderToString(<PopupContent photos={[]} price={itm.listing.monthlyRent} id={itm.id} title={itm.listing.title} currency={itm.listing.currency.symbol}/>)

            new mapboxgl.Marker(el)
                .setLngLat([itm.longitude, itm.latitude])
                .setPopup(new mapboxgl.Popup({ offset: -75, anchor: 'bottom' }).setHTML(htmlString))
                .addTo(mapRef.current!);

            mapMarkerRef.current.set(itm.id, [itm.longitude, itm.latitude]);
        });

    }, [listings]);

    useEffect(() => {
        
        const fetchListings = async () => {
           
            await getListings()
        };

        fetchListings();

    }, [lat])

    return (
      <div id='main_map' className={styles.map} ref={mapContainerRef}>
    
      </div>
    )
}

export default Mapbox;