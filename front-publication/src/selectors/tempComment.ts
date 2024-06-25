import axios from 'axios';
import { TempCommentData, TempCommentCreateData } from '../interface/TempCommentData';


const BASE_URL = 'http://127.0.0.1:3001';

const tempComment = {

  fetchAll: async (): Promise<TempCommentData[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/temp-comments`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des temp-comments :', error);
      throw error;
    }
  },

  create: async (TempCommentCreateData: TempCommentCreateData) => {
    try {
      const response = await axios.post(`${BASE_URL}/comments`, TempCommentCreateData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du comment :', error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/temp-comments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du temp-comment avec l'ID ${id} :`, error);
      throw error;
    }
  },
}

export default tempComment;