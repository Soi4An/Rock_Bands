import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MoveBack from './MoveBack';
import Image from 'react-bootstrap/Image';
import Divider from './Divider';
import BandAdd from './BandAdd';
import { BandShort } from '../types/BandShort';

type Props = {
  band: BandShort,
};

function BandHeader({ band }: Props) {
  return (
    <Row className="d-flex align-items-center">
      <Col
        xs={2}
        md={{ span: 2, offset: 1 }}
        className="px-2 d-grid gap-3"
      >
        <MoveBack />
        <BandAdd band={band}/>
      </Col>

      <Col xs={6} md={4} className="px-2">
        <div className="d-flex justify-content-end">
          <h2 className="
            py-4
            px-3
            m-0
            text-center
            fs-1
            fw-bolder
            bg-dark
            bg-gradient
            rounded-5
            text-warning
            text-opacity-100
            bg-opacity-75
            w-100
            border-warning
            border
          ">
            {band.name}
          </h2>
        </div>
      </Col>

      <Col xs={4} md={4} lg={4} className="p-2">
        <div
          className="
            bg-image__square
            bg-image
            rounded-circle
          "
          style={{ backgroundImage: `url(${band.img})` }}
        />
      </Col>
    </Row>
  );
}

export default BandHeader;
