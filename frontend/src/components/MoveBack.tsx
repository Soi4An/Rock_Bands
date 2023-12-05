import Image from 'react-bootstrap/Image';
import arrowLeftSmall from '../images/icon-box-arrow-left.svg';
import { Link, useLocation } from "react-router-dom";

function MoveBack() {
  const { state } = useLocation();

  return (
    <>
      <Link
        to={state}
        className="
          btn
          btn-dark
          btn-lg
          w-100
          d-none
          d-md-flex
          align-items-center
          justify-content-center
        "
      >
        <Image src={arrowLeftSmall} />
        <span className="ms-2">{'Back'}</span>
      </Link>

      <Link
        to={state}
        className="btn btn-dark btn-sm w-100 d-none d-sm-block d-md-none"
      >
        <Image src={arrowLeftSmall} />
        <span className="ms-2">{'Back'}</span>
      </Link>

      <Link
        to={state}
        className="
          btn
          btn-dark
          btn-sm
          w-100
          d-flex
          d-sm-none
          align-items-center
          justify-content-center
        "
      >
        <Image src={arrowLeftSmall} />
      </Link>
    </>

  );
}

export default MoveBack;
