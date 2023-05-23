import { useEffect, useState } from 'react';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText, Pagination, Typography } from '@mui/material';
import { Beer } from '../../types';
import { fetchData } from './utils';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';

import { Filters as IFilters, SORT } from '../../types';
import BeerFilters from './BeerFilters';
import BeerSort from './BeerSort';


const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState<SORT>('name:asc');
  const [filters, setFilters] = useState<IFilters>({});
  const [itemsPerPage] = useState(50);

  const updateBeerList = (beerListValue: Array<Beer>, numItems?: number) => {
    setBeerList(beerListValue);
    if (numItems) {
      setTotalPages(Math.ceil(numItems / itemsPerPage));
    }    
   }

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, updateBeerList), []);
// eslint-disable-next-line
  useEffect(fetchData.bind(this, updateBeerList, { filters, sortOrder, page, itemsPerPage, requestMetaData : true } ),
   [filters, sortOrder]);
   // eslint-disable-next-line
  useEffect(fetchData.bind(this, updateBeerList, { filters, sortOrder, page, itemsPerPage, requestMetaData : false } ),
   [page]);


  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const updateFilters = (filterValues: IFilters) => {
    setFilters(filterValues);
    setPage(1);
  };

  const updateSortOrder = (sortOrderValue: SORT) => {
    setSortOrder(sortOrderValue);
    setPage(1);
  };

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <main>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <BeerSort sortOrder={sortOrder} updateSortOrder={updateSortOrder}/>
        </div>          
        <div style={{ display: "flex" }}>
  <div style={{ flex: 1 }}>
      <BeerFilters
          filters={filters}
          updateFilters={updateFilters}
      />
  </div>
  <div style={{ flex: 3 }}>
    <List>
      {beerList.map((beer) => (
        <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
          <ListItemAvatar>
            <Avatar>
              <SportsBar />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={beer.name}
            secondary={`${beer.brewery_type} - ${beer.city}, ${beer.state}, ${beer.country}`}
          />
        </ListItemButton>
      ))}
    </List>
    { totalPages > 1 && (
    <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} />
    )
    }
    {
      beerList.length === 0 && (
        <Typography variant="h6" sx={{ ml: 5 }}>
           No breweries found with the applied filters.
        </Typography>
      )
    }
  </div>
</div>

        </main>
      </section>
    </article>
  );
};

export default BeerList;
