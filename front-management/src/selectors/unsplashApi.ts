/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import UnsplashData from '../interface/UnsplashData';

const BASE_URL: string = 'https://api.unsplash.com';
const API_KEY: string = '&client_id=KVGJaA1GCV8mTD7_cawChrGmZTddCMwX1QbftQd4jxc';

const Unsplash = {
    searchPhoto: async (query: string): Promise<UnsplashData[]> => {
        try {
            const response = await axios.get(`${BASE_URL}/search/photos?page=1&query=${query}${API_KEY}`);
            console.log(response.data.results);
            const data: UnsplashData[] = response.data.results.map((picture: any) => ({
                name: picture.alt_description,
                path: picture.links.download
            }));
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des images :', error);
            throw error;
        }
    }
}

export default Unsplash;
