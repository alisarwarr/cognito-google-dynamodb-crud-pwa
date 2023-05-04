//REACTJS
import { useState, useEffect } from 'react';


export default function useGeoLocation() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []);


    useEffect(() => {
        if (latitude && longitude) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1`)
                .then((response) => response.json())
                .then((data) => {
                    setCity(data.address.city || data.address.town || data.address.village);
                    setCountry(data.address.country || '');
                    setLocation(data.display_name || '');
                })
                .catch(error => console.error(error));
        }
    }, [latitude, longitude]);


    return {latitude, longitude, location, city, country};
}