import '../styles/customStyles.scss';
import Container from 'react-bootstrap/Container';

import Divider from './Divider';
import { BandTrack } from '../types/BandFull';
import AudioPlayer from './AudioPlayer/AudioPlayer';

type Props = {
  tracks: BandTrack[],
};

function BandTabTracks({ tracks }: Props) {
  return (
    <>
      <Divider />

      <Container className="pb-3">
        <ul className="m-0 list-unstyled">
          {tracks.map((song, ind) => (
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
    </>
  );
}

export default BandTabTracks;
