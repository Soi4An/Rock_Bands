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

import imageGenre from '../images/photo/genres/classic-rock-2.jpg';
import { GenreFull } from '../types/GenreFull';
import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { getFullGenre } from '../api/genreApi';
import { SearchLink } from '../helpers/SearchLink';
import MoveBack from '../components/MoveBack';
import ReadLater from '../components/GenreAdd';
import Divider from '../components/Divider';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import GenreHeader from '../components/GenreHeader';
import { GenreShort } from '../types/GenreShort';

const track = { name: 'Take That - Patience', link: '../../audio/audio.mp3' }
const lorem100 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, aut itaque quas consequatur accusantium minima incidunt in ea excepturi sequi optio consectetur porro atque iste labore enim voluptatem quasi eveniet sunt necessitatibus numquam sint, libero laborum sit! Assumenda id obcaecati illo tempore ipsum non totam at laudantium, deserunt sequi aperiam tempora inventore iste minima quo in? Laboriosam eligendi aspernatur reprehenderit optio, dolor velit tenetur exercitationem delectus hic repudiandae voluptatem explicabo quas omnis aut ducimus commodi perspiciatis magnam excepturi similique eum molestiae adipisci. Sint praesentium quibusdam molestias itaque debitis in aliquid culpa quam delectus enim deleniti, ipsa dolorem harum repellendus laborum?';
const lorem40 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente vel similique sunt expedita rerum sed adipisci, nemo ducimus voluptatibus iste neque quasi aut. Voluptate eos nam voluptatum aliquid. Praesentium dolores iste ipsam! Nam, corporis nihil! Quod consequatur fugiat magni excepturi!';
const TEST_DETAILS: GenreFull = {
  id: 1,
  img: imageGenre,
  name: 'Classic rock',
  year: 1990,
  quantityBands: 305,
  heavines: '6/10',
  info: [{ title: 'History', text: [lorem40, lorem100] }, { title: 'Interesting facts', text: [lorem100, lorem40] }],
  bands: [{ name: 'AC/DC', songs: ['Road to hell', 'Road to hell-2'] }, { name: 'Nirvana', songs: ['Smell in hotel', 'Smell in hotel-2'] }],
  examples: [{ id: 'classic-rock-song-1', name: track.name, link: track.link }, { id: 'classic-rock-song-2', name: track.name, link: track.link }],
};

export const GenreDetails = () => {
  const [product, setProduct] = useState<GenreFull | null>(null);
  const [isErr, setIsErr] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { genreId } = useParams();

  const {
    id,
    img,
    name,
    year,
    quantityBands,
    heavines,
    info,
    bands,
    examples
  } = TEST_DETAILS;

  const shortGenre: GenreShort = {
    id, genreId: genreId as string, img, name, year, quantityBands, heavines
  };

  // useEffect(() => {
  //   if (genreId) {
  //     setIsLoading(true);

  //     getFullGenre(genreId)
  //       .then(setProduct)
  //       .catch((mess) => setIsErr(mess))
  //       .finally(() => setIsLoading(false));
  //   }
  // }, [genreId]);

  return (
    <>
      <Header />

      {TEST_DETAILS && (
      <Container className="bg-light-subtle rounded-2">
        <GenreHeader genre={shortGenre}/>

        <Tabs
          defaultActiveKey="history"
          id="fill-tab-example"
          className="mt-3"
          justify
        >
          <Tab eventKey="history" title="History">
            <Divider />

            <Container className="pb-1">
              {info.map(par => (
                <React.Fragment key={par.title}>
                  <h4>{par.title}</h4>

                  {par.text.map((t, ind) => (
                    <p key={`${par.title}-par-${ind}`}>{t}</p>
                  ))}
                </React.Fragment>
              ))}
            </Container>
          </Tab>

          <Tab eventKey="popularity" title="Popularity">
            <Divider />

            <Container className="pb-3">
              <Accordion alwaysOpen>
                {bands.map(par => (
                  <Accordion.Item key={par.name} eventKey={par.name}>
                    <Accordion.Header>{par.name}</Accordion.Header>
                    <Accordion.Body>
                      <ul className="m-0">
                        {par.songs.map(song => (
                          <li key={song}>{song}</li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Container>
          </Tab>

          <Tab eventKey="try-it" title="Try it" disabled>
            <Divider />

            <Container className="pb-3">
              <ul className="m-0 list-unstyled">
                {examples.map((song, ind) => (
                  <li key={`song-${ind}`}>
                    <audio controls className="w-100">
                      <source src={song.link} type="audio/mpeg" />
                      Your browser does not support the audio tag.
                    </audio>

                    <audio controls src="../../audio/audio-2.mp3" />
                  </li>
                ))}
              </ul>

              <AudioPlayer />
            </Container>
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
      )}
    </>
  );
};
