interface IMovieContext {
  trendingMovies: IMovie[];
  fetchTrendingMovies: (page: number) => Promise<IMovie[]>;
  fetchMovieDetails: (id: number) => Promise<IMovie | undefined>;
  searchMovies: (query: string, page: number) => Promise<IMovie[]>;
  fetchMovieCredits: (id: number) => Promise<ICast | undefined>;
}
