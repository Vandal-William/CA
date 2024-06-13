import axios from 'axios';
import PublicationData from '../interface/PublicationData';

const BASE_URL = 'http://127.0.0.1:3000';

const publication = {

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

  create: async (publicationData: PublicationData, title: string , cover: string | undefined) => {
    try {
      publicationData.title = title;
      publicationData.cover = cover;
      const response = await axios.post(`${BASE_URL}/publications`, publicationData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la publication :', error);
      throw error;
    }
  },

  update: async (id: string, publicationData: PublicationData) => {
    try {
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

  uploadFile: async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await axios.post(`${BASE_URL}/publications/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.path;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du fichier :', error);
      throw error;
    }
  },
}

export default publication;
