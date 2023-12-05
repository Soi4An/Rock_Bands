import { useState } from 'react';
import { useLocation, useSearchParams } from "react-router-dom";
import { getGenres } from '../api/genreApi';
import { GenreShort } from '../types/GenreShort';
import { SearchLink } from '../helpers/SearchLink';
import { SortParams  } from '../types/SortParams';

import classNames from 'classnames';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import iconArrowReset from '../images/icon-arrow-restart.svg';
import { GenersRequest } from '../types/GenersRequest';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setGenres } from '../redux/slices/genresSlice';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { BandShort } from '../types/BandShort';
const DEF_SORT = SortParams .NameKey;
const DEF_QUERY = '';

type Props = {
  // values: GenreShort[],
  // setValues: (newGenres: GenreShort[]) => void,
  // typeOfData: 'genres' | 'bands';
  // setData: ActionCreatorWithPayload<GenreShort[], "genres/setGenres">
  //   | ActionCreatorWithPayload<BandShort[], "bands/setBands">,
};

export const GenresShowMore: React.FC<Props> = ({
  // values: genres, setValues,
  // values: genres
}) => {
  // const { genres } = useAppSelector(state => state.genres);
  const { genres } = useAppSelector(state => state.genres);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErr, setIsErr] = useState<boolean>(false);

  const newPage = isErr ? +page : +page + 1;

  const handlerShowMore = () => {
    setIsLoading(true);

    const newRequest: GenersRequest = {
      page: newPage,
      sort: DEF_SORT,
      query: DEF_QUERY,
    };

    getGenres(newRequest)
      .then(resp => {
        dispatch(setGenres(!genres ? [...resp] : [...genres, ...resp]))
        // setValues([...genres, ...resp]);
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
        <Spinner animation="border" size="sm" />
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
