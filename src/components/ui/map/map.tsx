'use client'
import { useEffect, useRef } from 'react';
import styles from './map.module.css';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useParams from '@/hooks/useParams';
import ReactDOMServer from 'react-dom/server';
import PopupContent from './popup/popup';

export type Currency = {
	id: string;
	code: string;
	symbol: string;
};

export type ListingImages = {
    id: number,
    isPrimary: boolean,
    url: string
}

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
    peopleAllowed: number;
	isChecked: boolean;
	createdAt: string;
	updatedAt: string; 
	currency: Currency;
    images: Array<ListingImages>;
    nextAvailableDate: {
        tz: string;
        milliseconds: number;
        yymmdd: string;
    }
    utilityMap: {
        waterIncluded: boolean,
        electricIncluded: boolean,
        internetIncluded: boolean,
        allBillsIncluded: boolean ,
    }
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


interface MapboxProps { coordinates: LngLatLike; mpKey: string | undefined; listings: Array<Address> | any}

const Mapbox: React.FC<MapboxProps> = ({ coordinates, mpKey, listings = [] }) => {

    if (!Array.isArray(listings)) return (<>no listings</>);

    mapboxgl.accessToken = mpKey;

    const { setParam } = useParams();

    const mapContainerRef = useRef<HTMLDivElement>(null);

    const mapRef = useRef<mapboxgl.Map | null>(null);

    const mapMarkerRef = useRef(new Map());

    useEffect(() => {

        if (!mapContainerRef.current) return;

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: coordinates,
          zoom: 11.5,
        });
        
        mapRef.current.on('dragend', updateParam);
        mapRef.current.on('zoomend', updateParam);
        
        function updateParam(){

            const { lng, lat } = mapRef.current!.getCenter();

            const ln = lng.toFixed(6);
            const la = lat.toFixed(6);

            setParam([
                { key: 'long', value: String(ln) },
                { key: 'lat', value: String(la) }
            ]);
        }

        return () => {
            
            mapRef.current!.remove();
        };
    
    }, []);

    useEffect(() => {

        if (!mapRef.current) return;

        const currentListingIds = new Set(listings.map(itm => itm.id));

        for (const [key, value] of mapMarkerRef.current){

            if(!currentListingIds.has(key)){
                value.remove();
                mapMarkerRef.current.delete(key)
            }

        }
        
        listings.forEach((itm) => {
            
            if(mapMarkerRef.current.has(itm.id)) return null;

            const el = document.createElement('div');

            el.className = styles.marker;
            el.innerHTML = `${itm.listing.currency.symbol} ${itm?.listing?.monthlyRent}` || '';
        
            const htmlString = ReactDOMServer.renderToString(
                <PopupContent 
                    photos={[]} 
                    price={itm.listing.monthlyRent} 
                    id={itm.id} 
                    title={itm.listing.title} 
                    currency={itm.listing.currency.symbol}
                />
            )

            const marker = new mapboxgl.Marker(el)
                .setLngLat([itm.longitude, itm.latitude])
                .setPopup(new mapboxgl.Popup({ offset: -75, anchor: 'bottom' }).setHTML(htmlString))
                .addTo(mapRef.current!);

            mapMarkerRef.current.set(itm.id, marker);
        });

    }, [listings]);

    useEffect(() => {
        return () => {mapMarkerRef.current = new Map()}
    }, [])

    return (
      <div id='main_map' className={styles.map} ref={mapContainerRef}>
    
      </div>
    )
}

export default Mapbox;