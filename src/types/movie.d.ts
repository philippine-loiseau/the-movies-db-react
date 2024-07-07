interface IMovie extends IMovieDetails {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface IMovieDetails {
  belongs_to_collection: any
  budget: number
  genres: IGenre[]
  homepage: string
  imdb_id: string
  production_companies: IProductionCompany[]
  production_countries: IProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: ISpokenLanguage[]
  status: string
  tagline: string
  title: string
}

interface IGenre {
  id: number
  name: string
}

interface IProductionCompany {
  id: number
  logo_path?: string
  name: string
  origin_country: string
}

interface IProductionCountry {
  iso_3166_1: string
  name: string
}

interface ISpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

interface ICast {
  cast: ICastMember[];
  crew: ICastMember[];
}

interface ICastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  known_for_department: string;
  order: number;
  popularity: number;
}
