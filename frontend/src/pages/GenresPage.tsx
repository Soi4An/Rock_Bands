import { useEffect, useState } from 'react';

import { Header } from "../components/Header";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/customStyles.scss';

import { FilterForGenre } from '../components/FilterForGenre';
import { GenreCard } from '../components/GenreCard';
import { GenreShort } from '../types/GenreShort';

import imageGenre from '../images/photo/genres/classic-rock-2.jpg';
import { getGenres } from '../api/genreApi';
import { SortParams } from '../types/SortParams';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Status } from '../types/Status';
import { GenersRequest } from '../types/GenersRequest';
import { getFirstPageOfGenresAsyncBy, setGenres } from '../redux/slices/genresSlice';
import { GenresShowMore } from '../components/GenresShowMore';
//////
const DEF_SORT = SortParams.NameKey;
const DEF_QUERY = '';
const TEST_CARD: GenreShort = {
  id: 1,
  genreId: 'classic-rock',
  img: imageGenre,
  name: 'Classic rock',
  year: 1985,
  quantityBands: 305,
  heavines: '6/10',
};

export const GenresPage = () => {
  const { genres, status } = useAppSelector(state => state.genres);
  const dispatch = useAppDispatch();
  // const [genres, setGeners] = useState<GenreShort[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isErr, setIsErr] = useState<boolean>(false);


  // useEffect(() => {
  // const newRequest: Omit<GenersRequest, 'page'> = {
  //   sort: DEF_SORT,
  //   query: DEF_QUERY,
  // };

  // dispatch(getFirstPageOfGenresAsyncBy(newRequest));

  //   // setIsLoading(true);
  //   // getGenres(1, DEF_SORT, DEF_QUERY)
  //   //   .then(setGeners)
  //   //   .catch(() => setIsErr(true))
  //   //   .finally(() => setIsLoading(false))
  // }, []);

  return (
    <>
      <Header />

      <Container className="d-flex gap-2">
        <Col xs={5} md={4} lg={2} className="px-2 bg-light-subtle rounded-2">
          <FilterForGenre />
        </Col>

        <Col xs={7} md={8} lg={10} className="p-2 bg-light-subtle rounded-2">
          {/* {!!ganres.length && status === Status.Inaction && ( */}
          {status === Status.Inaction && (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {Array.from({ length: 12 }).map((_, idx) => (
                <Col key={idx}>
                  <GenreCard genre={TEST_CARD} />
                </Col>
              ))}

              {!!genres && ( ///// add check sum of products
                <Col className="my-4 mx-auto">
                  <GenresShowMore />
                </Col>
              )}
            </Row>
          )}

          {/* {isLoading && !isErr && ( */}
          {status === Status.Loading && (
            <Col className="mt-2 d-flex justify-content-center ">
              <Spinner animation="border" />
            </Col>
          )}

          {/* {isErr && !isLoading && ( */}
          {status === Status.Failed && (
            <Col className="mt-2 mx-2">
              <h4>Error. Can not take items from server</h4>
            </Col>
          )}

          {/* // {!ganres.length && !isLoading && !isErr && (
          {!ganres.length && status === Status.Inaction && (
            <Col>
              <h3>Nothing was found for your request</h3>
            </Col>
          )} */}
        </Col>
      </Container >
    </>
  );
}
