import { useContext } from 'react';
import Link from '@mui/material/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Beer as IBeer } from '../../types';
import { FavoriteBreweriesContext } from '../../context/FavoriteBreweriesContext';

import styles from './FavoriteBeerIcon.module.css';

interface FavoriteBeerIconProps {
  beer: IBeer | undefined
}

const FavoriteBeerIcon = ( {beer} : FavoriteBeerIconProps ) => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  const { addFavoriteBrewery, removeFavoriteBrewery, isBreweryFavorite } = useContext( FavoriteBreweriesContext );

  const handleAddToFavorites = () => {
    addFavoriteBrewery(beer);
  };

  const handleRemoveFromFavorites = () => {
    removeFavoriteBrewery(beer?.id);
  };

  if(!beer) {
    return ( <div/> );
  }

  return (
    <div>
      {isBreweryFavorite(beer?.id) ? (
        <Link color="inherit"  onClick={handleRemoveFromFavorites} className={styles.link}>
          <FavoriteIcon sx={{ mr: 1 }} />
          {!isMobile && <p style={{ margin: 0 }}>Favorite</p>}
        </Link>  ) : (
        <Link color="inherit"  onClick={handleAddToFavorites} className={styles.link}>
          <FavoriteBorderIcon sx={{ mr: 1 }} />
          {!isMobile && <p style={{ margin: 0 }}>Favorite</p>}
        </Link>
      )}
    </div>
  );
};

export default FavoriteBeerIcon;