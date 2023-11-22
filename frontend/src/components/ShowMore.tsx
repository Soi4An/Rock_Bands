import { useState } from 'react';
import { useLocation, useSearchParams } from "react-router-dom";
import { getGenres } from '../api/genreApi';
import { GenreShort } from '../types/GenreShort';
import { SearchLink } from '../helpers/SearchLink';
import { SortParaps } from '../types/SortParams';

import classNames from 'classnames';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import iconArrowReset from '../images/icon-arrow-restart.svg';
const DEF_SORT = SortParaps.NameKey;
const DEF_QUERY = '';

type Props = {
  values: GenreShort[],
  setValues: (newGenres: GenreShort[]) => void,
};

export const ShowMore: React.FC<Props> = ({
  values: genres, setValues,
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErr, setIsErr] = useState<boolean>(false);

  const newPage = isErr ? +page : +page + 1;

  const handlerShowMore = () => {
    setIsLoading(true);

    getGenres(newPage, DEF_SORT, DEF_QUERY)
      .then(resp => {
        setValues([...genres, ...resp]);
        setIsErr(false);
      })
      .catch(() => setIsErr(true))
      .finally(() => setIsLoading(false))
  };

  return (
    isLoading
      ? <Button
        variant={isErr ? 'danger' : 'success'}
        className="w-100"
      >
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        />
      </Button >
      : <SearchLink
        params={{ page: newPage.toString() }}
        state={location}
        className={classNames(
          'btn',
          'w-100',
          { 'btn-success': !isErr },
          { 'btn-danger': isErr },
        )}
        onClick={handlerShowMore}
      >
        <Image src={iconArrowReset} roundedCircle />
        <span className="ms-2">
          {isErr ? 'Try again' : 'Show more'}
        </span>
      </SearchLink>
  );
};
