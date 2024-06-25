import axios from 'axios';
import { RevenuData } from '../interface/RevenuData';


const BASE_URL = 'http://127.0.0.1:3001';

const revenue = {

  fetchAll: async (): Promise<RevenuData[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/revenues`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des revenues :', error);
      throw error;
    }
  },
}

export default revenue;