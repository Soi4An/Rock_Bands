import Row from 'react-bootstrap/Row';

function Divider() {
  return (
    <>
      <Row className="pt-1 border-top border-warning"></Row>
      <Row className="pt-1 border-top border-warning border-opacity-75"></Row>
      <Row className="pt-1 border-top border-warning border-opacity-50"></Row>
      <Row className="pt-1 mb-3 border-top border-warning border-opacity-25"></Row>
    </>
  );
}

export default Divider;
