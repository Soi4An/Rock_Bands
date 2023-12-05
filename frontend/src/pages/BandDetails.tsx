import React, { useEffect, useState } from 'react';

import '../styles/customStyles.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image';

import imageBand from '../images/photo/bands/avatars-hyJEwQzyBwczTEfs-UmFlag-t500x500.jpg';
import imageBandLong from '../images/photo/genres/classic-rock-2.jpg';
import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { getFullGenre } from '../api/genreApi';
import { SearchLink } from '../helpers/SearchLink';
import { BandFull } from '../types/BandFull';

import BandHeader from '../components/BandHeader';
import BandTabHistory from '../components/BandTabHistory';
import BandTabMembers from '../components/BandTabMembers';
import BandTabGenres from '../components/BandTabGenres';
import BandTabTracks from '../components/BandTabTracks';
import { BandShort } from '../types/BandShort';

const track = { name: 'Take That - Patience', link: '../../audio/audio.mp3' }
const lorem100 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, aut itaque quas consequatur accusantium minima incidunt in ea excepturi sequi optio consectetur porro atque iste labore enim voluptatem quasi eveniet sunt necessitatibus numquam sint, libero laborum sit! Assumenda id obcaecati illo tempore ipsum non totam at laudantium, deserunt sequi aperiam tempora inventore iste minima quo in? Laboriosam eligendi aspernatur reprehenderit optio, dolor velit tenetur exercitationem delectus hic repudiandae voluptatem explicabo quas omnis aut ducimus commodi perspiciatis magnam excepturi similique eum molestiae adipisci. Sint praesentium quibusdam molestias itaque debitis in aliquid culpa quam delectus enim deleniti, ipsa dolorem harum repellendus laborum?';
const lorem40 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente vel similique sunt expedita rerum sed adipisci, nemo ducimus voluptatibus iste neque quasi aut. Voluptate eos nam voluptatum aliquid. Praesentium dolores iste ipsam! Nam, corporis nihil! Quod consequatur fugiat magni excepturi!';
const TEST_DETAILS: BandFull = {
  id: 1,
  bandId: 'ac-dc',
  img: imageBand,
  name: 'AC/DC',
  year: 1909,
  genresNames: ['classic-rock', 'metal'],
  history: [{ title: 'History', description: [lorem40, lorem100] }, { title: 'Interesting facts', description: [lorem100, lorem40] }],
  members: [{ member: 'Tom J', img: imageBandLong, description: [lorem40, lorem100] }, { member: 'Garry D', description: [lorem100, lorem40] }],
  genres: [{ genre: 'classic-rock', songs: ['Road to hell', 'Road to hell-2'] }, { genre: 'metal', songs: ['Smell in hotel', 'Smell in hotel-2'] }],
  tracks: [{ id: 'classic-rock-song-1', name: track.name, link: track.link }, { id: 'classic-rock-song-2', name: track.name, link: track.link }],
};


function BandDetails() {
  // const [product, setProduct] = useState<BandFull | null>(null);
  const [isErr, setIsErr] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { bandId } = useParams();

  const {
    id,
    img,
    name,
    year,
    genresNames,
    history,
    members,
    genres,
    tracks,
  } = TEST_DETAILS;
  const shortBand: BandShort = {
    id, bandId: bandId as string, img, name, year, genresNames,
  };

  // useEffect(() => {
  //   if (bandId) {
  //     setIsLoading(true);

  //     getFullBand(bandId)
  //       .then(setProduct)
  //       .catch((mess) => setIsErr(mess))
  //       .finally(() => setIsLoading(false));
  //   }
  // }, [bandId]);

  return (
    <>
      <Header />

      <Container className="bg-light-subtle rounded-2">
        <BandHeader band={shortBand} />

        <Tabs
          defaultActiveKey="history"
          id="fill-tab-example"
          className="mt-3"
          justify
        >
          <Tab eventKey="history" title="History">
            <BandTabHistory history={history} />
          </Tab>

          <Tab eventKey="members" title="Members">
            <BandTabMembers members={members} />
          </Tab>

          <Tab eventKey="genres" title="Genres">
            <BandTabGenres genres={genres} />
          </Tab>

          <Tab eventKey="popular-traks" title="Popular tracks" disabled>
            <BandTabTracks tracks={tracks} />
          </Tab>
        </Tabs>

        {isLoading && !isErr && (
          <Col className="mt-2 d-flex justify-content-center ">
            <Spinner animation="border" />
          </Col>
        )}

        {isErr && !isLoading && (
          <Col className="mt-2 mx-2">
            <h4>Error. Can not take items from server</h4>
            <p>{isErr}</p>
          </Col>
        )}

        {/* {!product && !isLoading && !isErr && (
            <Col>
              <h3>Nothing was found for your request</h3>
            </Col>
          )} */}
      </Container>
    </>
  );
}

export default BandDetails;
