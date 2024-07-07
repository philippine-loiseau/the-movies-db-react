import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const API_TOKEN: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjJkNjNjZGRjMDY2ZDk5ZWQzZTgwNmQzMjY3MThjYSIsInN1YiI6IjYyNGVhNTRhYjc2Y2JiMDA2ODIzODc4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zuuBq1c63XpADl8SQ_c62hezeus7VibE1w5Da5UdYyo';
const BASE_URL: string = 'https://api.themoviedb.org/3';
const MAX_REQUESTS: number = 1;
const PER_MILLISECOND: number = 1000;

const api = rateLimit(axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
}), {maxRequests: MAX_REQUESTS, perMilliseconds: PER_MILLISECOND});

export const getTrendingMovies = async (page: number): Promise<IMovie[]> => {
  try {
    const response = await api.get('/trending/movie/week', {
      params: {
        page,
        language: 'fr-FR',
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error getting movies', error);
    throw error;
  }
};

export const getMovieDetails = async (id: number | undefined): Promise<IMovie> => {
  try {
    const response = await api.get(`/movie/${id}`, { params: {language: 'fr-FR'},});
    return response.data;
  } catch (error) {
    console.error(`Erreur getting movie with: ${id}:`, error);
    throw error;
  }
};

export const searchMovies = async (query: string, page: number) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        query,
        page,
        language: 'fr-FR',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Erreur lors de la recherche de films (query: ${query}):`, error);
    throw error;
  }
};

export const getMovieCredits = async (id: number | undefined) => {
  try {
    const response = await api.get(`/movie/${id}/credits`, {
      params: {language: 'fr-FR'},
    });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des crédits du film avec l'id: ${id}:`, error);
    throw error;
  }
}
