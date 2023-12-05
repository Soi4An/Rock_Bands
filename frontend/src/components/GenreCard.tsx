
import { Link, useLocation } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

import '../styles/customStyles.scss';
import { GenreShort } from '../types/GenreShort';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUser } from '../redux/slices/userSlice';
import { User } from '../types/User';
import { patchUser } from '../api/_____userApi';

type Props = {
  genre: GenreShort,
};

export const GenreCard: React.FC<Props> = ({ genre }) => {
  const { genreId, img, name, year, quantityBands, heavines } = genre;
  const { user } = useAppSelector(state => state.user);
  const { pathname, search } = useLocation();
  const dispatch = useAppDispatch();

  const startAdded = user?.genres.some(genre => genre.genreId === genreId) || false;

  // const [isAdded, setIsAdded] = useState<boolean>(startAdded);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hanadlerChangeGenreInUser = (currentUser: User, newGenres: GenreShort[]) => {
    const oldUser = { ...currentUser };
    const newUser = { ...oldUser, genres: newGenres };

    newUser.genres = newGenres;

    dispatch(setUser(newUser));
    setIsLoading(true);
    // setIsAdded(c => !c);

    patchUser(oldUser.id, newUser)
      .then(() => { })
      .catch(() => {
        dispatch(setUser(oldUser));
        // setIsAdded(c => !c)
      })
      .finally(() => setIsLoading(false))
  };

  const handlerDeleteGenre = () => {
    if (user) {
      const newGenres = user.genres.filter(genre => genre.genreId !== genreId);

      hanadlerChangeGenreInUser(user, newGenres);
    }
  };

  const handlerAddGenre = () => {
    if (user) {
      const newGenres = [...user.genres, genre];

      hanadlerChangeGenreInUser(user, newGenres);
    }
  };

  return (
    <Card className="text-center hover-border-light transition-border">
      <div
        className="bg-image__square bg-image m-1"
        style={{ backgroundImage: `url(${img})` }}
      />
      <Card.Body className="p-3 pt-1">
        <Card.Title
          className="m-0 pb-1 mb-1 border-bottom border-light"
        >
          {name}
        </Card.Title>

        <Card.Text className="mb-1 d-flex justify-content-between">
          <span>Borned</span>
          <span>{`~ ${year}`}</span>
        </Card.Text>

        <Card.Text className="mb-1 d-flex justify-content-between">
          <span>Bands</span>
          <span>{`~ ${quantityBands}`}</span>
        </Card.Text>

        <Card.Text className="d-flex justify-content-between">
          <span>Heavines</span>
          <span>{heavines}</span>
        </Card.Text>

        <Row className="mx-0 d-grid gap-2 w-100">
          <Card.Link
            as={Link}
            to={`/genres/${genreId}`}
            state={{ pathname, search }}
            className="btn btn-primary"
          >
            Learn more
          </Card.Link>

          <Button
            variant={startAdded ? 'success' : 'warning'}
            onClick={startAdded ? handlerDeleteGenre : handlerAddGenre}
            disabled={isLoading}
          >
            {isLoading && (<Spinner animation="border" />)}
            {startAdded && !isLoading && 'Almost added'}
            {!startAdded && !isLoading && 'Read later'}
          </Button>

        </Row>
      </Card.Body>
    </Card>
  );
};
