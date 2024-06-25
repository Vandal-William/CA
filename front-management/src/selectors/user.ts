import axios from 'axios';
import { UserData } from '../interface/UserData';


const BASE_URL = 'http://127.0.0.1:3001';

const user = {

  fetchAll: async (): Promise<UserData[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des users :', error);
      throw error;
    }
  },

  fetchOne: async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du user avec l'ID ${id} :`, error);
      throw error;
    }
  },

}

export default user;