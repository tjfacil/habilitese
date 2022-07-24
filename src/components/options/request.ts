const axios = require('axios').default;

const TJFACIL_API_URL = 'https://api-tribunais.herokuapp.com/courts/summary';

interface ICourtsResponse {
  total: number;
  courts: ICourt[];
}

export interface ICourt {
  _id: string;
  code: string;
  abbr: string;
  name: string;
}

export const getCourtsData = async () => {
  try {
    const response = await axios.get(TJFACIL_API_URL);
    return (response.data as ICourtsResponse).courts;
  } catch (e) {
    return [];
  }
};
