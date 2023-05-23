import { SelectChangeEvent } from '@mui/material';
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';


import { SORT } from '../../types';

interface BeerSortProps {
  sortOrder: SORT,
  updateSortOrder: (sort: SORT) => void;
}

const BeerSort = ({ sortOrder, updateSortOrder } : BeerSortProps) => {

  const handleSortChange = ( event: SelectChangeEvent<string> ) => {
    updateSortOrder(event.target.value as SORT);
  };

  return (       <FormControl
    variant="outlined"
    style={{ minWidth: "200px", marginRight: "20px" }}
  >
    <InputLabel id="sort-label">Sort</InputLabel>
    <Select
      labelId="sort-label"
      id="sort"
      value={sortOrder}
      onChange={handleSortChange}
      label="Sort"
    >
      <MenuItem value="">None</MenuItem>
      <MenuItem value="type:asc">Type (A-Z)</MenuItem>
      <MenuItem value="type:desc">Type (Z-A)</MenuItem>
      <MenuItem value="name:asc">Name (A-Z)</MenuItem>
      <MenuItem value="name:desc">Name (Z-A)</MenuItem>
      <MenuItem value="country:asc">Country (A-Z)</MenuItem>
      <MenuItem value="country:desc">Country (Z-A)</MenuItem>
      <MenuItem value="city:asc">City (A-Z)</MenuItem>
      <MenuItem value="city:desc">City (Z-A)</MenuItem>
    </Select>
  </FormControl> )
};

export default BeerSort;
