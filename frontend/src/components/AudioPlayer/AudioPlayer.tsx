import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import '../../styles/customStyles.scss';
import { GenreFull } from '../../types/GenreFull';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import iconMute from '../../images/icon-volume-mute.svg';
import iconVolume from '../../images/icons-volume-up.svg';
import iconPlay from '../../images/icon-play.svg';
import iconPause from '../../images/icon-pause.svg';
import { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';

type GenreSongs = {
  id: string,
  name: string,
  link: string,
};

const track = { name: 'Take That - Patience', link: '../../audio/audio-2.mp3' }
const TEST_SONG: GenreSongs = { id: 'classic-rock-song-1', name: track.name, link: track.link };
const MAX_VOLUME = 20;

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlerClickPlay = () => {
    // //try 2
    const playPromise = audioRef.current?.play();
 
  if (playPromise !== undefined) {
    console.log('click - play');

    playPromise.then(_ => {
      console.log('then');
      // Automatic playback started!
      // Show playing UI.
      setIsPlaying(true);
      // We can now safely pause video...
      audioRef.current?.pause();
    })
    .catch(error => {
      console.log('catch');
      // Auto-play was prevented
      // Show paused UI.
      setIsPlaying(false);
    });
  }

    // //try 1
    // if (isPlaying) {
    //   audioRef.current?.pause();
    //   // setIsPlaying(false);
    // } else {
    //   setIsPlaying(true)
    //   audioRef.current?.play()
    //     .then()
    //     .catch(err => console.log(err))
    //     .finally(() => setIsPlaying(false))
    // }
  };

  // const handlePlay = () => {
  //   audioRef.current?.play();
  // };

  const handlerChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!audioRef.current) {
      const { value } = e.target;
      const volume = Number(value) / MAX_VOLUME;
  
      audioRef.current.volume = volume;
      // console.log(audioRef.current.volume);
    }
  };

  // useEffect(() => {
  //   const button = document.querySelector('#button-play');

  //   if (!!button) {
  //     button.addEventListener("click", handlerClickPlay);
  //     return () => {
  //       button.removeEventListener("click", handlerClickPlay);
  //     }
  //   }
  // });

  return (
    <div className={classNames(
      'py-1',
      'my-1',
      'd-grid',
      'd-md-flex',
      'align-items-center',
      'rounded-4',
      { 'bg-secondary': isPlaying },
      { 'bg-dark': !isPlaying },
    )}>
      <Col xs={12} md={5} lg={6} xl={7} className="">
        <span className="ps-4 fs-4">{TEST_SONG.name}</span>
      </Col>

      <Col xs={12} md={7} lg={6} xl={5} className="d-flex justify-content-center align-items-center">

        <Col xs={2} className="d-flex justify-content-center">
          <Button
            id="button-play"
            variant="primary"
            className="p-3 background-image transition-background-image"
            style={{ backgroundImage: isPlaying ? `url(${iconPause})` : `url(${iconPlay})` }}
            onClick={handlerClickPlay}
          />
        </Col>

        <Col xs={{ span: 6, offset: 2 }} md={{ span: 8, offset: 0 }} className="d-flex justify-content-center ">
          <Col xs={2} md={2} className="d-flex justify-content-center ">
            <Image
              src={iconMute}
              rounded
            />
          </Col>

          <Col xs={8} md={8} className="d-flex justify-content-center">
            <Form.Range
              min={0}
              max={MAX_VOLUME}
              onChange={handlerChangeVolume}
            />
          </Col>

          <Col xs={2} md={2} className="d-flex justify-content-center">
            <Image
              src={iconVolume}
              rounded

            />
          </Col>
        </Col>
      </Col>

      <audio preload="" ref={audioRef} autoPlay>
        <source src={TEST_SONG.link} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  );
}

export default AudioPlayer;