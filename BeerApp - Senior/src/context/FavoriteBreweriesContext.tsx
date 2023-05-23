import React, { createContext, useState, useEffect, useRef } from 'react';
import { Beer as IBeer } from '../types';

export const FavoriteBreweriesContext = createContext<any>({});

export const FavoriteBreweriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favoriteBreweries, setFavoriteBreweries] = useState<IBeer[]>([]);
  const isInitialRenderUpdate = useRef(true);
  
  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('favoriteBreweries');
    if (storedFavorites) {
      setFavoriteBreweries(JSON.parse(storedFavorites) as IBeer[]);
    }    
  }, []);

  useEffect(() => {
    if (!isInitialRenderUpdate.current) {
      sessionStorage.setItem('favoriteBreweries', JSON.stringify(favoriteBreweries));
    }
  }, [favoriteBreweries]);

  const addFavoriteBrewery = (brewery: IBeer) => {
    isInitialRenderUpdate.current = false;
    setFavoriteBreweries((prevFavorites) => [...prevFavorites, brewery]);
  };

  const removeFavoriteBrewery = (breweryId: string) => {
    isInitialRenderUpdate.current = false;
    setFavoriteBreweries((prevFavorites) =>
      prevFavorites.filter((brewery) => brewery.id !== breweryId)
    );
  };

  const isBreweryFavorite = (breweryId: string) => {
    return favoriteBreweries.some((brewery) => brewery.id === breweryId);
  };

  return (
    <FavoriteBreweriesContext.Provider
      value={{
        favoriteBreweries,
        addFavoriteBrewery,
        removeFavoriteBrewery,
        isBreweryFavorite,
      }}
    >
      {children}
    </FavoriteBreweriesContext.Provider>
  );
};