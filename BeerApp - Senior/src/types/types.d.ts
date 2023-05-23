type TYPE =
  | 'micro'
  | 'nano'
  | 'regional'
  | 'brewpub'
  | 'large'
  | 'planning'
  | 'bar'
  | 'contract'
  | 'proprietor'
  | 'closed';

type SORT = 
  | 'type:asc' 
  | 'type:desc' 
  | 'name:asc' 
  | 'name:desc' 
  | 'country:asc' 
  | 'country:desc' 
  | 'state:asc' 
  | 'state:desc' 
  | 'city:asc' 
  | 'city:desc' ;

export type { TYPE, SORT };
