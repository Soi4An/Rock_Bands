import '../styles/customStyles.scss';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Divider from './Divider';
import { BandMember } from '../types/BandFull';

type Props = {
  members: BandMember[],
};

function BandTabMembers({ members }: Props) {
  return (
    <>
      <Divider />

      <Container className="pb-3">
        <Accordion alwaysOpen>
          {members.map(memb => (
            <Accordion.Item key={memb.member} eventKey={memb.member}>
              <Accordion.Header>{memb.member}</Accordion.Header>
              <Accordion.Body>
                {memb.img ? (
                  <Row className="d-flex">
                    <Col xs={6} md={4} className="px-2 d-grid gap-3">
                      <Image
                        src={memb.img}
                        rounded
                        className="w-100 image-band-member sticky-top"
                      />
                    </Col>

                    <Col xs={6} md={8} >
                      {memb.description.map(text => (
                        <p key={text} className="text-justify">
                          {text}
                        </p>
                      ))}
                    </Col>
                  </Row>
                ) : (
                  <Row className="d-flex">
                    {memb.description.map(text => (
                      <p key={text} className="text-justify">
                        {text}
                      </p>
                    ))}
                  </Row>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </>
  );
}

export default BandTabMembers;
