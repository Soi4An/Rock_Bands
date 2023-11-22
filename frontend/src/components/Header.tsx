import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { HeaderLinks } from '../types/HeaderLinks';
import { useAppSelector } from '../redux/hooks';

const DEF_GENRES_LINK = `${HeaderLinks.Genres}?page=1&sort=name`;
const DEF_BANDS_LINK = `${HeaderLinks.Bands}?page=1&sort=name`;
// const DEF_TICKETS_LINK = `${HeaderLinks.Tickets}?page=1&sort=date`;

export const Header = () => {
  const { user } = useAppSelector(state => state.user);
  const { pathname } = useLocation();

  return (
    <Navbar expand="md" className="fs-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React-Bootstrap
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ height: 40, width: 40, padding: 0 }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to={DEF_GENRES_LINK}
              active={pathname === HeaderLinks.Genres}
            >
              Genres
            </Nav.Link>

            <Nav.Link
              as={Link}
              to={DEF_BANDS_LINK}
              active={pathname === HeaderLinks.Bands}
            >
              Bands
            </Nav.Link>

            <Nav.Link
              as={Link}
              to={HeaderLinks.Tickets} ///////
              active={pathname === HeaderLinks.Tickets}
            >
              Tickets
            </Nav.Link>
          </Nav>

          {user && <Nav>
            <Nav.Link
              as={Link}
              to={HeaderLinks.MyPage}
              active={pathname === HeaderLinks.MyPage}
            >
              My page
            </Nav.Link>
          </Nav>}
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}
