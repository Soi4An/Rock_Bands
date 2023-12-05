import { useEffect, useState } from 'react';

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

const DEF_SORT = SortParams.NameKey;
const ID_INPUT_NAME = 'filter-name';
const ID_SELECT_SORT = 'filter-sort-params';
const optionsForSort: { key: SortParams, name: SortParams }[] = [
  { key: SortParams.NameKey, name: SortParams.NameName },
  { key: SortParams.AgeKey, name: SortParams.AgeName },
  { key: SortParams.SongsKey, name: SortParams.SongsName },
  { key: SortParams.HeavinessKey, name: SortParams.HeavinessName },
];

type Props = {
  // setGenres: (newGeneres: GenreShort[]) => void,
  // isLoading: boolean,
  // setIsLoading: (loading: boolean) => void,
  // isErr: boolean,
  // setIsErr: (newErr: boolean) => void,
};

export const FilterForGenre: React.FC<Props> = ({
  // setGenres, isLoading, setIsLoading, setIsErr, isErr,
  // isLoading, setIsLoading, setIsErr, isErr,
}) => {
  const { status } = useAppSelector(state => state.genres);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const searchQuery = searchParams.get('query') || null;

  const [query, setQuery] = useState<string>(searchQuery || '');
  const [select, setSelect] = useState<SortParams>(sort as SortParams || DEF_SORT);
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);
  const [disabledReset, setDisabledReset] = useState<boolean>(false);

  const handlerReset = () => {
    // setIsLoading(true);
    setQuery('');
    setSelect(DEF_SORT);

    const newRequest: Omit<GenersRequest, 'page'> = {
      sort: DEF_SORT,
      query: '',
    };

    dispatch(getFirstPageOfGenresAsyncBy(newRequest));

    // const newRequest: GenersRequest = {
    //   page: 1,
    //   sort: DEF_SORT,
    //   query: '',
    // };

    // getGenres(newRequest)
    //   .then(res => {
    //     dispatch(setGenres(res));
    //     // setGenres(res);
    //     setDisabledReset(true);
    //   })
    //   .catch(() => setIsErr(true))
    //   .finally(() => {
    //     setIsLoading(false)
    //   })
  };

  const handlerSubmit = () => {
    // setIsLoading(true);

    const newRequest: Omit<GenersRequest, 'page'> = {
      sort: select,
      query: query,
    };

    dispatch(getFirstPageOfGenresAsyncBy(newRequest));

    // const newRequest: GenersRequest = {
    //   page: 1,
    //   sort: select,
    //   query: query,
    // };

    // getGenres(newRequest)
    //   .then(res => {
    //     dispatch(setGenres(res));
    //     // setGenres(res);
    //     setDisabledSubmit(true);
    //   })
    //   .catch(() => setIsErr(true))
    //   .finally(() => {
    //     setIsLoading(false)
    //     setQuery(query)
    //     setSelect(select)
    //   })
  };

  const handlerChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelect = e.target.value;

    return setSelect(newSelect as SortParams);
  }

  useEffect(() => {
    // if (!isErr) {
      if (status !== Status.Failed) {
      const queryForComparison = !searchQuery ? '' : searchQuery;

      (query === queryForComparison && select === sort)
        ? setDisabledSubmit(true)
        : setDisabledSubmit(false);

      (query === '' && select === DEF_SORT)
        ? setDisabledReset(true)
        : setDisabledReset(false);
    }
  }, [query, select]);

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
          onChange={handlerChangeSelect}
          value={select}
        >
          {optionsForSort.map(option => {
            const { key, name } = option;

            return (
              <option key={key} value={key}>
                {name}
              </option>
            );
          })}
        </Form.Select>
      </Form.Group>

      <div className="d-grid gap-2">
        <SearchLink
          params={{
            page: '1',
            sort: select,
            query: query || null,
          }}
          state={location}
          className={classNames(
            'btn',
            'btn-primary',
            // { disabled: disabledSubmit || isLoading }
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
            // { disabled: disabledReset || isLoading }
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
