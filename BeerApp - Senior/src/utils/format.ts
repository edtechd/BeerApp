const formatAddress = (street?: string, city?: string, state?: string, country?: string) : string =>  {
  const addressParts: string[] = [];

  if (street && street.trim() !== '') {
    addressParts.push(street);
  }
  if (city && city.trim() !== '') {
    addressParts.push(city);
  }
  if (state && state.trim() !== '') {
    addressParts.push(state);
  }
  if (country && country.trim() !== '') {
    addressParts.push(country);
  }

  return addressParts.join(', ');
};

const formatURL = (url: string) : string => {
  let formattedURL = url;

  // Remove protocol prefix (http:// or https://)
  formattedURL = formattedURL.replace(/^(https?:\/\/)/, '');

  // Remove "www." prefix
  formattedURL = formattedURL.replace(/^www\./, '');

  return formattedURL;
};

export { formatAddress, formatURL };