import { Header } from "../components/Header";
import { useState } from 'react';

import '../styles/customStyles.scss';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { UserPageLinks } from "../types/UserPageLinks";

import iconMusic from '../images/icon-music-note.svg';
import iconPeople from '../images/icon-people.svg';
import iconTicket from '../images/icon-ticket.svg';
import iconSetting from '../images/icon-setting.svg';
import UserGenres from "../components/UserGenres";
import UserBands from "../components/UserBands";
import UserSetting from "../components/UserSetting";
import UserTickets from "../components/UserTickets";

const USER_LINKS = [
  { name: UserPageLinks.Genres, img: iconMusic },
  { name: UserPageLinks.Bands, img: iconPeople },
  { name: UserPageLinks.Tickets, img: iconTicket },
  { name: UserPageLinks.Setting, img: iconSetting },
];

function MyPage() {
  const [activeLink, setActiveLink] = useState<UserPageLinks>(UserPageLinks.Genres);

  const handlerClickOnLink = (newLink: UserPageLinks) => {
    window.scrollTo(0, 0);
    setActiveLink(newLink);
  };

  return (
    <>
      <Header />

      <Container className="d-flex gap-2">
        <Col xs={5} md={4} lg={2} >
          <ListGroup as="ul" className="sticky-top">
            {USER_LINKS.map(link => (
              <ListGroup.Item
                key={link.name}
                as="li"
                active={link.name === activeLink}
                className="hover-bg-primary transition-bg-color pointer d-flex"
                onClick={() => handlerClickOnLink(link.name)}
              >
                <Image
                  src={link.img}
                  roundedCircle
                  className="me-2"
                />

                {link.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col xs={7} md={8} lg={10} className="p-2 bg-light-subtle rounded-2">
          {activeLink === UserPageLinks.Genres && (
            <UserGenres />
          )}

          {activeLink === UserPageLinks.Bands && (
            <UserBands />
          )}

          {activeLink === UserPageLinks.Tickets && (
            <UserTickets />
          )}

          {activeLink === UserPageLinks.Setting && (
            <UserSetting />
          )}
        </Col>
      </Container>
    </>
  );
}

export default MyPage;
