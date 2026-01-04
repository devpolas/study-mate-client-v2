import { useState } from "react";

interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryName?: string;
  postcode?: string;
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function useGeoLocation(defaultLocation: Coordinates | null = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<Coordinates | null>(defaultLocation);
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getPosition = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocation(coords);

        try {
          const res = await fetch(
            `${BASE_URL}?latitude=${coords.lat}&longitude=${coords.lng}&localityLanguage=en`
          );
          if (!res.ok) throw new Error("Failed to fetch address");
          const data: Address = await res.json();
          setAddress(data);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(String(err));
          }
        } finally {
          setIsLoading(false);
        }
      },
      (err: GeolocationPositionError) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  };

  return { isLoading, location, address, error, getPosition };
}
