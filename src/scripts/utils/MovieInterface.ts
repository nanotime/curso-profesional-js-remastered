type Genre = {
  id: number;
  name: string;
};

type ProdCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type ProdCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLang = {
  iso_639_1: string;
  name: string;
};

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | any;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProdCompany[];
  production_countries: ProdCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLang[];
  status:
    | 'Rumored'
    | 'Planned'
    | 'In Production'
    | 'Post Production'
    | 'Released'
    | 'Canceled';
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
