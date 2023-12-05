import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MoveBack from './MoveBack';
import GenreAdd from './GenreAdd';
import { GenreShort } from '../types/GenreShort';

type Props = {
  genre: GenreShort,
};

function GenreHeader({ genre }: Props) {
  return (
    <Row className="d-flex align-items-center">
      <Col
        xs={2}
        md={{ span: 2, offset: 1 }}
        className="px-2"
      >
        <MoveBack />
      </Col>

      <Col xs={8} md={6} className="px-2">
        <div
          className="
          bg
          rounded-5
          rounded-top-0
          d-flex
          justify-content-center
        "
          style={{ backgroundImage: `url(${genre.img})` }}
        >
          <h2 className="
          py-4
          px-3
          m-0
          text-center
          fs-1
          fw-bolder
          bg-dark
          bg-gradient
          text-warning
          text-opacity-100
          bg-opacity-75
        ">
            {genre.name}
          </h2>
        </div>

      </Col>

      <Col xs={2} className="p-2">
        <GenreAdd genre={genre}/>
      </Col>
    </Row>
  );
}

export default GenreHeader;
