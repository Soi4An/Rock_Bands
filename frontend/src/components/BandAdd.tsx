import Image from 'react-bootstrap/Image';
import journalBookmark from '../images/icon-journal-bookmark.svg';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useState } from 'react';
import { setUser } from '../redux/slices/userSlice';
import { patchUser } from '../api/_____userApi';
import { User } from '../types/User';
import { BandShort } from '../types/BandShort';

type Props = {
  band: BandShort,
};

function BandAdd({ band }: Props) {
  const { bandId } = useParams();
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const startAdded = user?.bands.some(band => band.bandId === bandId) || false;
  const [isAdded, setIsAdded] = useState<boolean>(startAdded);

  const hanadlerChangeBandInUser = (currentUser: User, newBands: BandShort[]) => {
    const oldUser = { ...currentUser };
    const newUser = { ...oldUser, bands: newBands };

    dispatch(setUser(newUser));
    setIsAdded(c => !c);

    patchUser(oldUser.id, newUser)
      .then(() => { })
      .catch(() => {
        dispatch(setUser(oldUser));
        setIsAdded(c => !c)
      })
  };

  const handlerDeleteBand = () => {
    if (!!bandId && !!user) {
      const newBands = user.bands.filter(band => band.bandId !== bandId);
      // console.log('delete');
      hanadlerChangeBandInUser(user, newBands);
    }
  };

  const handlerAddBand = () => {
    if (!!bandId && !!user) {
      const newBands = [...user.bands, band];
      // console.log('add');
      hanadlerChangeBandInUser(user, newBands);
    }
  };

  return (
    <>
      <Button
        variant={isAdded ? 'success' : 'warning'}
        onClick={isAdded ? handlerDeleteBand : handlerAddBand}
        className="
          btn-lg
          w-100
          d-none
          d-md-flex
          align-items-center
          justify-content-center
        "
      >
        <span className="me-2">{isAdded ? 'Added' : 'Add'}</span>
        <Image src={journalBookmark} />

      </Button>

      <Button
        variant={isAdded ? 'success' : 'warning'}
        onClick={isAdded ? handlerDeleteBand : handlerAddBand}
        className="btn-sm w-100 d-none d-sm-block d-md-none"
      >
        <span className="me-2">{isAdded ? 'Added' : 'Add'}</span>
        <Image src={journalBookmark} />
      </Button>

      <Button
        variant={isAdded ? 'success' : 'warning'}
        onClick={isAdded ? handlerDeleteBand : handlerAddBand}
        className="
          btn-sm
          w-100
          d-flex
          d-sm-none
          align-items-center
          justify-content-center
        "
      >
        <Image src={journalBookmark} />
      </Button>
    </>
  );
}

export default BandAdd;
