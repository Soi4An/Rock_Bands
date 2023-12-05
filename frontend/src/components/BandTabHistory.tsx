import React from 'react';

import '../styles/customStyles.scss';
import Container from 'react-bootstrap/Container';
import Divider from './Divider';
import { BandHistory } from '../types/BandFull';

type Props = {
  history: BandHistory[],
};

function BandTabHistory({ history }: Props) {
  return (
    <>
      <Divider />

      <Container className="pb-1">
        {history.map(par => (
          <React.Fragment key={par.title}>
            <h4>{par.title}</h4>

            {par.description.map((t, ind) => (
              <p key={`${par.title}-par-${ind}`} className="text-justify">
                {t}
              </p>
            ))}
          </React.Fragment>
        ))}
      </Container>
    </>
  );
}

export default BandTabHistory;
