import axios from 'axios';
import { SubscriptionData, SubscriptionCreateData  } from '../../interface/publication/SubscriptionData';


const BASE_URL = 'http://127.0.0.1:3001';

const subscription = {

  fetchAll: async (): Promise<SubscriptionData[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/subscriptions`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des subscriptions :', error);
      throw error;
    }
  },

  fetchOne: async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/subscriptions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la subscriptions avec l'ID ${id} :`, error);
      throw error;
    }
  },

  create: async (SubscriptionCreateData: SubscriptionCreateData) => {
    try {
      const response = await axios.post(`${BASE_URL}/subscriptions`, SubscriptionCreateData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la subscriptions :', error);
      throw error;
    }
  },

  update: async (id: string, SubscriptionCreateData: SubscriptionCreateData) => {
    try {
      const response = await axios.put(`${BASE_URL}/subscriptions/${id}`, SubscriptionCreateData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la subscriptions avec l'ID ${id} :`, error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/subscriptions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la subscriptions avec l'ID ${id} :`, error);
      throw error;
    }
  },
}

export default subscription;