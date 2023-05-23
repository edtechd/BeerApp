import React, {useState} from 'react';
import {
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  Select,
  SelectChangeEvent
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CancelIcon from '@mui/icons-material/Cancel';

import { Filters as IFilters, TYPE } from '../../types';
import styles from './BeerFilters.module.css';

interface BeerFiltersProps {
  filters: IFilters,
  updateFilters: (filters: IFilters) => void;
}

const BeerFilters = ({ filters, updateFilters } : BeerFiltersProps) => {

  const [nameFilterVisible, setNameFilterVisible] = useState(false);
  const [typeFilterVisible, setTypeFilterVisible] = useState(false);
  const [countryFilterVisible, setCountryFilterVisible] = useState(false);
  const [stateFilterVisible, setStateFilterVisible] = useState(false);

  const toggleFilter = (filterType: string) => {
    switch(filterType) {
      case 'name':
        setNameFilterVisible(!nameFilterVisible);
        break;
      case 'type':
        setTypeFilterVisible(!typeFilterVisible);
        break;
      case 'country':
        setCountryFilterVisible(!countryFilterVisible);
        break;
      case 'state':
        setStateFilterVisible(!stateFilterVisible);
        break;
    }
  };

  const clearFilter = (filter: keyof IFilters) => {
    const updatedFilters = { ...filters, [filter]: "" };
    updateFilters(updatedFilters);
  };

  const handleFiltersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFilters = { ...filters, [event.target.name]: event.target.value };
    updateFilters(updatedFilters);
  };

  const handleTypeChange = (event: SelectChangeEvent<TYPE>) => {
    const type = event.target.value as TYPE;
    const updatedFilters: IFilters = {
      ...filters,
      by_type: type,
    };
    updateFilters(updatedFilters);
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const country = event.target.value;
    const updatedFilters: IFilters = {
      ...filters,
      by_country: country,
    };
    updateFilters(updatedFilters);
  };

  const handleClearFilters = () => {
    const updatedFilters: IFilters = {};
    updateFilters(updatedFilters);
  };

  
  return (
    <div>
      <div className={styles.filterSection}>
      <div className={styles.filterHeader}
          onClick={() => toggleFilter("name")}
        >
          <FilterListIcon sx={{ mr: 1 }}/>
          <Typography variant="h6" className={styles.filterHeaderTitle}>
            Name
          </Typography>
          {filters.by_name && (
            <CancelIcon onClick={() => clearFilter("by_name")} />
          )}
        </div>
        {nameFilterVisible && (
          <TextField
            name="by_name"
            label="Name"
            value={filters.by_name}
            onChange={handleFiltersChange}
            fullWidth
          />
        )}
      </div>
      <div className={styles.filterSection}>
      <div className={styles.filterHeader}
          onClick={() => toggleFilter("type")}
        >
          <FilterListIcon sx={{ mr: 1 }}/>
          <Typography variant="h6" className={styles.filterHeaderTitle}>
            Type
          </Typography>
          {filters.by_type && (
            <CancelIcon onClick={() => clearFilter("by_type")} />
          )}
        </div>
        {typeFilterVisible && (
          <FormControl fullWidth>
          <Select
            value={filters.by_type || ''}
            onChange={handleTypeChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select type
            </MenuItem>
            <MenuItem value="micro">Micro</MenuItem>
            <MenuItem value="nano">Nano</MenuItem>
            <MenuItem value="regional">Regional</MenuItem>
            <MenuItem value="brewpub">Brewpub</MenuItem>
            <MenuItem value="large">Large</MenuItem>
            <MenuItem value="planning">Planning</MenuItem>
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
            <MenuItem value="proprietor">Proprietor</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>
        )}
      </div>
      <div className={styles.filterSection}>
      <div className={styles.filterHeader}
          onClick={() => toggleFilter("country")}
        >
          <FilterListIcon sx={{ mr: 1 }}/>
          <Typography variant="h6" className={styles.filterHeaderTitle}>
            Country
          </Typography>
          {filters.by_country && (
            <CancelIcon onClick={() => clearFilter("by_country")} />
          )}
        </div>
        {countryFilterVisible && (
          <FormControl fullWidth>
          <Select
            value={filters.by_country || ''}
            onChange={handleCountryChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select country
            </MenuItem>
            <MenuItem value="Austria">Austria</MenuItem>
            <MenuItem value="England">England</MenuItem>
            <MenuItem value="France">France</MenuItem>
            <MenuItem value="Isle of Man">Isle of Man</MenuItem>
            <MenuItem value="Ireland">Ireland</MenuItem>
            <MenuItem value="Poland">Poland</MenuItem>
            <MenuItem value="Portugal">Portugal</MenuItem>
            <MenuItem value="Scotland">Scotland</MenuItem>
            <MenuItem value="South Korea">South Korea</MenuItem>
            <MenuItem value="United States">United States</MenuItem>
          </Select>
        </FormControl>
        )}
      </div>            
      <div className={styles.filterSection}>
      <div className={styles.filterHeader}
          onClick={() => toggleFilter("state")}
        >
          <FilterListIcon sx={{ mr: 1 }}/>
          <Typography variant="h6" className={styles.filterHeaderTitle}>
            State
          </Typography>
          {filters.by_state && (
            <CancelIcon onClick={() => clearFilter("by_state")} />
          )}
        </div>
        {stateFilterVisible && (
          <TextField
            name="by_state"
            label="State"
            value={filters.by_state}
            onChange={handleFiltersChange}
            fullWidth
          />
        )}
      </div>
      <div>
        <Button variant="contained" onClick={handleClearFilters}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default BeerFilters;
