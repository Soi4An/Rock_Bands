import '../styles/customStyles.scss';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Divider from './Divider';
import { BandGenre } from '../types/BandFull';

type Props = {
  genres: BandGenre[],
};

function BandTabGenres({ genres }: Props) {
  return (
    <>
      <Divider />

      <Container className="pb-3">
        <Row xs={1} sm={2} lg={3}>
          {genres.map(g => (
            <Col key={g.genre}>
              <Col className="">
                <h4>{g.genre}</h4>
              </Col>

              <Col>
                <ul className="">
                  {g.songs.map(song => (
                    <li key={song}>{song}</li>
                  ))}
                </ul>
              </Col>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default BandTabGenres;
