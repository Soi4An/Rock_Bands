import './HomePage.scss';

import { Header } from '../../components/Header';
import { Video } from '../../components/Video/Video';

export const HomePage = () => {

  return (
    <>
      <Header />

      <section className="home-page__video">
        <Video />
      </section>

      <section>
        Hello
      </section>
    </>
  );
}
