import { useAppSelector } from "../redux/hooks";
import { useState } from 'react';
import { GenreShort } from "../types/GenreShort";
import { GenreCard } from "./GenreCard";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import imageGenre from '../images/photo/genres/classic-rock.jpg';

const TEST_CARD: GenreShort = {
  id: 1,
  genreId: 'classic-rock',
  img: imageGenre,
  name: 'Classic rock',
  year: 1985,
  quantityBands: 305,
  heavines: '6/10',
};

function UserGenres() {
  const { user } = useAppSelector(store => store.user);

  // const [visibleGenres, setVisibleGenres] = useState<GenreShort[]>(user?.genres || []);
  const [visibleGenres, setVisibleGenres] = useState<GenreShort[]>(Array(12).fill(TEST_CARD));

  return (
    visibleGenres.length
      ? <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {visibleGenres.map((genre, idx) => (
          <Col key={idx}>
            <GenreCard genre={genre} />
          </Col>
        ))}
      </Row>
      : <Row>
        <h3>Your genre list is empty now...</h3>
      </Row>
  );
}

export default UserGenres;
