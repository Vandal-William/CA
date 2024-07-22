import axios from 'axios';
import PublicationData from '../interface/PublicationData';

const BASE_URL = 'http://changezdattitudes.com:3000';
// http://127.0.0.1:3000/publications
const publication = {

  search: async (serchTerm: string , categoryId: string): Promise<PublicationData[]> => {
    try {
      const response = await axios.post(`${BASE_URL}/publications/search`, {term: serchTerm, id: categoryId});
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des publications :', error);
      throw error;
    }
  },

  fetchAll: async (): Promise<PublicationData[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/publications`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des publications :', error);
      throw error;
    }
  },

  fetchOne: async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/publications/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la publication avec l'ID ${id} :`, error);
      throw error;
    }
  },

  create: async (publicationData: PublicationData, title: string , cover: string | undefined, summary: string, cat: string) => {
    try {
      publicationData.title = title;
      publicationData.cover = cover;
      publicationData.summary = summary;
      publicationData.categoryId = cat;
      const response = await axios.post(`${BASE_URL}/publications`, publicationData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la publication :', error);
      throw error;
    }
  },

  update: async (id: string, publicationData: PublicationData, title: string, cover: string, summary: string, cat: string) => {
    try {
      publicationData.title = title;
      publicationData.cover = cover;
      publicationData.summary = summary;
      publicationData.categoryId = cat;
      const response = await axios.put(`${BASE_URL}/publications/${id}`, publicationData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la publication avec l'ID ${id} :`, error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/publications/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la publication avec l'ID ${id} :`, error);
      throw error;
    }
  },
}

export default publication;
