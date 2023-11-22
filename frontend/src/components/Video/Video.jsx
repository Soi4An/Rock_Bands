import videoBg from '../../videos/people-at-the-concert-short.mp4';
import './Video.scss';

export const Video = () => {

  return (
    <>
      <video
        className="video"
        src={videoBg}
        autoPlay
        loop
        muted
      ></video>

      <div className="video__quote--container fs-4">
        <i className="video__quote">
          {"\"Rock music is a healing force for the soul.\" - Steve Vai"}
        </i>
      </div>
    </>
  );
}