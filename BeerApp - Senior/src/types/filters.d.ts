import { TYPE } from './';

interface Filters {
  by_name?: string;
  by_country?: string;
  by_state?: string;
  by_city?: string;
  by_type?: TYPE;
}

export type { Filters };