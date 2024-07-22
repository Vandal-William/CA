import axios from 'axios';
import {CategoryData, CreateCategoryData} from '../interface/CategoryData';


const BASE_URL = 'http://changezdattitudes.com:3000';

const category = {

  fetchAll: async (): Promise<CategoryData[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des categories :', error);
      throw error;
    }
  },

  fetchOne: async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la categorie avec l'ID ${id} :`, error);
      throw error;
    }
  },

  create: async (CategoryData: CreateCategoryData) => {
    try {
      const response = await axios.post(`${BASE_URL}/categories`, CategoryData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la categorie :', error);
      throw error;
    }
  },

  update: async (id: string, CategoryData: CategoryData) => {
    try {
      const response = await axios.put(`${BASE_URL}/categories/${id}`, CategoryData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la categorie avec l'ID ${id} :`, error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la categorie avec l'ID ${id} :`, error);
      throw error;
    }
  },
}

export default category;