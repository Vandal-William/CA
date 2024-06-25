import axios from 'axios';
import { BenefitData, BenefitCreateData } from '../interface/BenefitData';


const BASE_URL = 'http://127.0.0.1:3001';

const benefit = {

  fetchAll: async (): Promise<BenefitData[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/benefits`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du benefits :', error);
      throw error;
    }
  },

  fetchOne: async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/benefits/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du benefit avec l'ID ${id} :`, error);
      throw error;
    }
  },

  create: async (BenefitCreateData: BenefitCreateData) => {
    try {
      const response = await axios.post(`${BASE_URL}/benefits`, BenefitCreateData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du benefit :', error);
      throw error;
    }
  },

  update: async (id: string, BenefitCreateData: BenefitCreateData) => {
    try {
      const response = await axios.put(`${BASE_URL}/benefits/${id}`, BenefitCreateData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du benefit avec l'ID ${id} :`, error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/benefits/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du benefit avec l'ID ${id} :`, error);
      throw error;
    }
  },
}

export default benefit;