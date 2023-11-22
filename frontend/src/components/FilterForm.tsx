import { useEffect, useState } from 'react';

import Form from 'react-bootstrap/Form';
import '../styles/customStyles.scss';

import { SortParaps } from '../types/SortParams';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchLink } from '../helpers/SearchLink';
import { GenreShort } from '../types/GenreShort';
import { getGenres } from '../api/genreApi';
import classNames from 'classnames';

const DEF_SORT = SortParaps.NameKey;
const ID_INPUT_NAME = 'filter-name';
const ID_SELECT_SORT = 'filter-sort-params';
const optionsForSort: { key: SortParaps, name: SortParaps }[] = [
  { key: SortParaps.NameKey, name: SortParaps.NameName },
  { key: SortParaps.AgeKey, name: SortParaps.AgeName },
  { key: SortParaps.SongsKey, name: SortParaps.SongsName },
  { key: SortParaps.HeavinessKey, name: SortParaps.HeavinessName },
];

type Props = {
  setGenres: (newGeneres: GenreShort[]) => void,
  isLoading: boolean,
  setIsLoading: (loading: boolean) => void,
  isErr: boolean,
  setIsErr: (newErr: boolean) => void,
};

export const FilterForm: React.FC<Props> = ({
  setGenres, isLoading, setIsLoading, setIsErr, isErr,
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const searchQuery = searchParams.get('query') || null;

  const [query, setQuery] = useState<string>(searchQuery || '');
  const [select, setSelect] = useState<SortParaps>(sort as SortParaps || DEF_SORT);
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);
  const [disabledReset, setDisabledReset] = useState<boolean>(false);

  const handlerReset = () => {
    setIsLoading(true);
    setQuery('')
    setSelect(DEF_SORT)

    getGenres(1, DEF_SORT, '')
      .then(res => {
        setGenres(res);
        setDisabledReset(true);
      })
      .catch(() => setIsErr(true))
      .finally(() => {
        setIsLoading(false)
      })
  };

  const handlerSubmit = () => {
    setIsLoading(true);

    getGenres(1, select, query)
      .then(res => {
        setGenres(res);
        setDisabledSubmit(true);
      })
      .catch(() => setIsErr(true))
      .finally(() => {
        setIsLoading(false)
        setQuery(query)
        setSelect(select)
      })
  };

  const handlerChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelect = e.target.value;

    return setSelect(newSelect as SortParaps);
  }

  useEffect(() => {
    if (!isErr) {
      const queryComparison = !searchQuery ? '' : searchQuery;

      (query === queryComparison && select === sort)
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
          className="light-hover"
          placeholder="metal"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor={ID_SELECT_SORT}>Sort by:</Form.Label>
        <Form.Select
          id={ID_SELECT_SORT}
          className="light-hover"
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
            { disabled: disabledSubmit || isLoading }
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
            { disabled: disabledReset || isLoading }
          )}
          onClick={handlerReset}
        >
          Reset
        </SearchLink>
      </div>
    </Form>
  );
};
