import MovieTypeEnum from '~/types/movies/move-type.enum';

interface SearchMovieEmitType {
  title: string;
  year: number | null;
  movieType: MovieTypeEnum;
}

export default SearchMovieEmitType;
