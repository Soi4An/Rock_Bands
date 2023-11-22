import Image from 'react-bootstrap/Image';
import journalBookmark from '../images/icon-journal-bookmark.svg';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useState } from 'react';
import handlerChangeInUser from '../helpers/_____handlerChangeInUser';
import { setUser } from '../redux/slices/userSlice';
import { patchUser } from '../api/_____userApi';
import { User } from '../types/User';

// const DEF_BUTTON_CLASSES = 'w-100 align-items-center justify-content-center';

function ReadLater() {
  const { genreId } = useParams();
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const startAdded = !!user?.genres.find(id => id === genreId) || false;
  const [isAdded, setIsAdded] = useState<boolean>(startAdded);

  const hanadlerChangeGenreInUser = (currentUser: User, newGenres: string[]) => {
    const oldUser = { ...currentUser };
    const newUser = { ...oldUser };

    newUser.genres = newGenres;

    dispatch(setUser(newUser));
    setIsAdded(c => !c);

    patchUser(oldUser.id, newUser)
      .then(() => { })
      .catch(() => {
        dispatch(setUser(oldUser));
        setIsAdded(c => !c)
      })
  };

  const handlerDeleteGenre = () => {
    if (!!genreId && !!user) {
      const newGenres = user.genres.filter(id => id !== genreId);

      hanadlerChangeGenreInUser(user, newGenres);
    }
  };

  const handlerAddGenre = () => {
    if (!!genreId && !!user) {
      const newGenres = [...user.genres, genreId];

      hanadlerChangeGenreInUser(user, newGenres);
    }
  };

  return (
    <>
      <Button
        variant={isAdded ? 'success' : 'warning'}
        onClick={isAdded ? handlerDeleteGenre : handlerAddGenre}
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
        onClick={isAdded ? handlerDeleteGenre : handlerAddGenre}
        className="btn-sm w-100 d-none d-sm-block d-md-none"
      >
        <span className="me-2">{isAdded ? 'Added' : 'Add'}</span>
        <Image src={journalBookmark} />
      </Button>

      <Button
        variant={isAdded ? 'success' : 'warning'}
        onClick={isAdded ? handlerDeleteGenre : handlerAddGenre}
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

export default ReadLater;
