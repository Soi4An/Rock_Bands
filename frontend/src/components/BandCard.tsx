
import { Link, useLocation } from 'react-router-dom';

import '../styles/customStyles.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { GenreShort } from '../types/GenreShort';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setUser } from '../redux/slices/userSlice';
import { User } from '../types/User';
import { patchUser } from '../api/_____userApi';
import { BandShort } from '../types/BandShort';

type Props = {
  band: BandShort,
};

export const BandCard: React.FC<Props> = ({ band }) => {
  const { bandId, img, name, year, genresNames } = band;
  const { user } = useAppSelector(state => state.user);
  const { pathname, search } = useLocation();
  const dispatch = useAppDispatch();

  const startAdded = user?.bands.some(band => band.bandId === bandId) || false;

  // const [isAdded, setIsAdded] = useState<boolean>(startAdded);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const hanadlerChangeBandInUser = (currentUser: User, newBands: BandShort[]) => {
    const oldUser = { ...currentUser };
    const newUser = { ...oldUser, bands: newBands };

    dispatch(setUser(newUser));
    // setIsAdded(c => !c);]
    setIsLoading(true)

    patchUser(oldUser.id, newUser)
      .then(() => {})
      .catch(() => {
        dispatch(setUser(oldUser));
        // setIsAdded(c => !c)
      })
      .finally(() => setIsLoading(false));
  };

  const handlerDeleteBand = () => {
    if (user) {
      const newBands = user.bands.filter(band => band.bandId !== bandId);

      hanadlerChangeBandInUser(user, newBands);
    }
  };

  const handlerAddBand = () => {
    if (user) {
      const newBands = [...user.bands, band];

      hanadlerChangeBandInUser(user, newBands);
    }
  };

  return (
    <Card className="text-center hover-border-light transition-border card-gitar">
      <div
        className="bg-image__square bg-image m-1 rounded-circle rounded-top-0"
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
          <span className="d-flex flex-wrap justify-content-between">
            <span className="lh-3">Genres:</span>

            {genresNames.map(g => (
              <span
                key={`${name}-${g}`}
                className="px-1 mx-1 my-1 bg-secondary lh-2"
              >
                {g}
              </span>
            ))}
          </span>
        </Card.Text>

        <Row className="mx-0 d-grid gap-2 w-100">
          <Card.Link
            as={Link}
            to={`/bands/${bandId}`}
            state={{ pathname, search }}
            className="btn btn-primary"
          >
            Learn more
          </Card.Link>

          <Button
            variant={startAdded ? 'success' : 'warning'}
            onClick={startAdded ? handlerDeleteBand : handlerAddBand}
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
