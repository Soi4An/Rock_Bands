import { useEffect, useState } from 'react';

import { Header } from "../../components/Header";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { FilterForm } from '../../components/FilterForm';

import '../../styles/customStyles.scss';
import { GenreCard } from '../../components/GenreCard';
import { GenreShort } from '../../types/GenreShort';

import imageGenre from '../../images/photo/genres/classic-rock-2.jpg';
import { getGenres } from '../../api/genreApi';
import { ShowMore } from '../../components/ShowMore';
import { SortParaps } from '../../types/SortParams';

const DEF_SORT = SortParaps.NameKey;
const DEF_QUERY = '';
const TEST_CARD: GenreShort = {
  id: 1,
  genreId: 'classic-rock',
  img: imageGenre,
  name: 'Classic rock',
  year: 1985,
  bands: 305,
  heavines: '6/10',
};

export const GenresPage = () => {
  const [genres, setGeners] = useState<GenreShort[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isErr, setIsErr] = useState<boolean>(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   getGenres(1, DEF_SORT, DEF_QUERY)
  //     .then(setGeners)
  //     .catch(() => setIsErr(true))
  //     .finally(() => setIsLoading(false))
  // }, []);

  return (
    <>
      <Header />

      <Container className="d-flex gap-2">
        <Col xs={5} md={4} lg={2} className="px-2 bg-light-subtle rounded-2">
          <FilterForm
            setGenres={setGeners}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isErr={isErr}
            setIsErr={setIsErr}
          />
        </Col>

        <Col xs={7} md={8} lg={10} className="p-2 bg-light-subtle rounded-2">
          {/* {!!ganres.length && !isLoading && !isErr && ( */}
          {!isLoading && !isErr && (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {Array.from({ length: 12 }).map((_, idx) => (
                <Col key={idx}>
                  <GenreCard genre={TEST_CARD} />
                </Col>
              ))}

              <Col className="my-4 mx-auto">
                <ShowMore
                  values={genres}
                  setValues={setGeners}
                />
              </Col>
            </Row>
          )}

          {isLoading && (
            <Col className="mt-2 d-flex justify-content-center ">
              <span
                className="spinner-border spinner-border-md text-info"
                role="status"
                aria-hidden="true"
              />
            </Col>
          )}

          {isErr && !isLoading && (
            <Col className="mt-2 mx-2">
              <h4>Error. Can not take items from server</h4>
            </Col>
          )}

          {/* {!ganres.length && (
            <Col>
              <h3>Nothing was found for your request</h3>
            </Col>
          )} */}
        </Col>
      </Container >
    </>
  );
}
