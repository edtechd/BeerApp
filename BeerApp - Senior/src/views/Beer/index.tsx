import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

import { Beer as IBeer } from '../../types';
import TYPE_DESCRIPTIONS from '../../types/typeDescriptions';
import { fetchData } from './utils';
import { formatAddress, formatURL } from '../../utils/format';
import styles from './Beer.module.css';
import { useParams } from 'react-router-dom';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  return (
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover"  color="inherit"  href="/beer/">
          Beers
        </Link>
        <Typography color="text.primary">{beer?.name}</Typography>
      </Breadcrumbs>
      <Paper sx={{ p: 3, mt: 2 }}>
        <div className={styles.header}>
          <div>
            <Typography component="h1" variant="h4">{beer?.name}</Typography>
            <Typography variant="subtitle1">{beer && beer.brewery_type && TYPE_DESCRIPTIONS[beer.brewery_type]}</Typography>
          </div>
        </div>
        <Box sx={{ mt: 2}}>
        <List dense={true}>
        <ListItem>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon className={styles.listItemIcon}>
              <LocationOnIcon/>
            </ListItemIcon>
            <ListItemText primary={formatAddress(beer?.street, beer?.city, beer?.state, beer?.country)} />
          </ListItemButton>
          </ListItem>
          { beer?.website_url && ( <ListItem>
          <ListItemButton component="a" href={beer?.website_url}>
            <ListItemIcon className={styles.listItemIcon}>
              <PublicIcon/>
            </ListItemIcon>
            <ListItemText primary={formatURL(beer?.website_url)} />
          </ListItemButton>
          </ListItem> ) }
          { beer?.phone && ( <ListItem>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon className={styles.listItemIcon}>
              <PhoneIcon/>
            </ListItemIcon>
            <ListItemText primary={beer?.phone} />
          </ListItemButton>
          </ListItem> ) }
        </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default Beer;
