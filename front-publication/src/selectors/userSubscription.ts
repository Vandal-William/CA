import axios from 'axios';
import { UserSubscriptionData } from '../interface/UserSubscriptionData';


const BASE_URL = 'http://127.0.0.1:3001';

const userSubscription = {

  fetchAll: async (): Promise<UserSubscriptionData[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/user-subscriptions`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des user-subscriptions :', error);
      throw error;
    }
  },

}

export default userSubscription;