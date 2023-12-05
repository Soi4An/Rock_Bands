import { useEffect, useState } from 'react';

import { Header } from "../components/Header";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/customStyles.scss';

import imageBand from '../images/photo/bands/avatars-hyJEwQzyBwczTEfs-UmFlag-t500x500.jpg';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Status } from '../types/Status';
import { BandShort } from '../types/BandShort';
import { BandCard } from '../components/BandCard';
import { FilterForBands } from '../components/FilterForBands';
import { MainGenres } from '../types/MainGenres';
import { SortParams } from '../types/SortParams';
import { BandsShowMore } from '../components/BandsShowMore';

const DEF_SORT = SortParams.NameKey;
const DEF_GENRE = MainGenres.PopKey;
const TEST_CARD: BandShort = {
  id: 1,
  bandId: 'ac-dc',
  img: imageBand,
  name: 'AC/DC',
  year: 1991,
  genresNames: ['classic-rock', 'metal', 'alternative-rock', 'country'],
};

export const BandsPage = () => {
  const { bands, status } = useAppSelector(state => state.bands);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  // const newRequest: Omit<BandsRequest, 'page'> = {
  //   sort: DEF_SORT,
  //   query: null,
  //   genre: DEF_GENRE,
  // };

  // dispatch(getFirstPageOfBandsAsyncBy(newRequest));
  // }, []);

  return (
    <>
      <Header />

      <Container className="d-flex gap-2">
        <Col xs={5} md={4} lg={2} className="px-2 bg-light-subtle rounded-2">
          <FilterForBands />
        </Col>

        <Col xs={7} md={8} lg={10} className="p-2 bg-light-subtle rounded-2">
          {/* {!!ganres.length status === Status.Inaction && ( */}
          {status === Status.Inaction && (
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {Array.from({ length: 12 }).map((_, idx) => (
                <Col key={idx}>
                  <BandCard band={TEST_CARD} />
                </Col>
              ))}

              {!!bands && (
              <Col className="my-4 mx-auto">
                <BandsShowMore />
              </Col>
              )}
            </Row>
          )}

          {status === Status.Loading && (
            <Col className="mt-2 d-flex justify-content-center ">
              <Spinner animation="border" />
            </Col>
          )}

          {status === Status.Failed && (
            <Col className="mt-2 mx-2">
              <h4>Error. Can not take items from server</h4>
            </Col>
          )}

          {/*// {!ganres.length && !isLoading && !isErr && (
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
