import { useEffect, useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import '../styles/customStyles.scss';

import { SortParams } from '../types/SortParams';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchLink } from '../helpers/SearchLink';
import { GenreShort } from '../types/GenreShort';
import { getGenres } from '../api/genreApi';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { GenersRequest } from '../types/GenersRequest';
import { getFirstPageOfGenresAsyncBy, setGenres } from '../redux/slices/genresSlice';
import { Status } from '../types/Status';
import { MainGenres } from '../types/MainGenres';

const DEF_SORT = SortParams.NameKey;
const DEF_GENRE = MainGenres.PopKey;
const ID_INPUT_NAME = 'filter-name';
const ID_SELECT_SORT = 'filter-sort-params';
const ID_GENRE_SORT = 'filter-genre';
const optionsForBandsSort: { key: SortParams, name: SortParams }[] = [
  { key: SortParams.NameKey, name: SortParams.NameName },
  { key: SortParams.AgeKey, name: SortParams.AgeName },
  { key: SortParams.SongsKey, name: SortParams.SongsName },
];
const MainGenresForBands: { key: MainGenres, name: MainGenres }[] = [
  { key: MainGenres.PopKey, name: MainGenres.PopName },
  { key: MainGenres.RockKey, name: MainGenres.RockName },
  { key: MainGenres.HipHopKey, name: MainGenres.HipHopName },
  { key: MainGenres.ElectronicKey, name: MainGenres.ElectronicName },
  { key: MainGenres.JazzKey, name: MainGenres.JazzName },
  { key: MainGenres.ClassicalKey, name: MainGenres.ClassicalName },
];

type Props = {
};

export const FilterForBands: React.FC<Props> = ({ }) => {
  const { status } = useAppSelector(state => state.genres); ///////// bands
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchSort = searchParams.get('sort') || null;
  const searchQuery = searchParams.get('query') || null;
  const searchGenre = searchParams.get('genre') || null;

  const [query, setQuery] = useState<string>(searchQuery || '');
  const [sort, setSort] = useState<SortParams>(searchSort as SortParams || DEF_SORT);
  const [genre, setGenre] = useState<MainGenres>(searchGenre as MainGenres || DEF_SORT);
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);
  const [disabledReset, setDisabledReset] = useState<boolean>(false);

  const handlerReset = () => {
    setQuery('');
    setSort(DEF_SORT);
    setGenre(DEF_GENRE);

    const newRequest: Omit<GenersRequest, 'page'> = {
      sort: DEF_SORT,
      query: '',
    };

    dispatch(getFirstPageOfGenresAsyncBy(newRequest)); //////////// bands
  };

  const handlerSubmit = () => {
    const newRequest: Omit<GenersRequest, 'page'> = {
      sort: sort,
      query: query,
    };

    dispatch(getFirstPageOfGenresAsyncBy(newRequest)); //////////// bands
  };

  const handlerChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelect = e.target.value;

    return setSort(newSelect as SortParams);
  }

  const handlerChangeGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelect = e.target.value;

    return setGenre(newSelect as MainGenres);
  }

  // const handlerChangeSelect = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  //   setValue: (newvalue: SortParams | MainGenres) => void,
  // ) => {
  //   const newSelect = e.target.value;

  //   return setValue(newSelect as SortParams | MainGenres);
  // };

  useEffect(() => {
    if (status !== Status.Failed) {
      const queryForComparison = !searchQuery ? '' : searchQuery;

      (query === queryForComparison
        && sort === searchSort
        && genre === searchGenre)
        ? setDisabledSubmit(true)
        : setDisabledSubmit(false);

      (query === '' && sort === DEF_SORT && genre === DEF_GENRE)
        ? setDisabledReset(true)
        : setDisabledReset(false);
    } else {
      setDisabledSubmit(false);
      setDisabledReset(false);
    }
  }, [query, sort, genre]);

  return (
    <Form className="py-2 sticky-top">
      <Form.Group className="mb-3">
        <Form.Label htmlFor={ID_INPUT_NAME}>Genre name:</Form.Label>
        <Form.Control
          id={ID_INPUT_NAME}
          className="hover-border-light transition-border"
          placeholder="metal"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor={ID_SELECT_SORT}>Sort by:</Form.Label>
        <Form.Select
          id={ID_SELECT_SORT}
          className="hover-border-light transition-border"
          onChange={handlerChangeSort}
          // onChange={(e) => handlerChangeSelect(e, setSort)}
          value={sort}
        >
          {optionsForBandsSort.map(option => {
            const { key, name } = option;

            return (
              <option key={key} value={key}>
                {name}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor={ID_GENRE_SORT}>Choose genre:</Form.Label>
        <Form.Select
          id={ID_GENRE_SORT}
          className="hover-border-light transition-border"
          onChange={handlerChangeGenre}
          value={genre}
        >
          {MainGenresForBands.map(option => {
            const { key, name } = option;

            return (
              <option key={key} value={key}>
                {name}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>

      {/* <Accordion className="mb-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Accordion Item #1</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}

      <div className="d-grid gap-2">
        <SearchLink
          params={{
            page: '1',
            sort: sort,
            query: query || null,
          }}
          state={location}
          className={classNames(
            'btn',
            'btn-primary',
            { disabled: disabledSubmit || status === Status.Loading }
          )}
          onClick={handlerSubmit}
        >
          Search
        </SearchLink>

        <SearchLink
          params={{
            page: '1',
            sort: DEF_SORT,
            query: null,
          }}
          className={classNames(
            'btn',
            'btn-secondary',
            { disabled: disabledReset || status === Status.Loading }
          )}
          onClick={handlerReset}
        >
          Reset
        </SearchLink>
      </div>
    </Form>
  );
};
