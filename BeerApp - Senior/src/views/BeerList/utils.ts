import { getBeerList, getBeerMetaData } from '../../api';
import { ApiParams, Beer, Filters, SORT } from '../../types';
import handle from '../../utils/error';

interface fetchDataParams {
  filters?: Filters, 
  sortOrder?: SORT, 
  page?: number,  
  itemsPerPage?: number,
  requestMetaData?: boolean
}

const fetchData = (setData: (data: Array<Beer>, numItems?: number) => void, params?: fetchDataParams) => {
  const fetchParams: ApiParams = {
    page: params?.page, per_page: params?.itemsPerPage, sort: params?.sortOrder,
    by_name: params?.filters?.by_name,
    by_country: params?.filters?.by_country || undefined,
    by_state: params?.filters?.by_state || undefined,
    by_type: params?.filters?.by_type || undefined,
  };
  
  (async () => {
    try {
      const response = await getBeerList(fetchParams);
      let numItems: number | undefined = undefined;
      if(params?.requestMetaData) {
        const responseMetaData = await getBeerMetaData(fetchParams);
        if(responseMetaData.data)
         numItems = responseMetaData.data.total;
      }
      setData(response.data, numItems);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData };
